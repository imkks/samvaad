import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivateMessage } from './entity/privatemessage.entity';
import { In, Repository } from 'typeorm';
import { GroupMessage } from './entity/groupmessage.entity';
import { MessageBodyDto } from './dto/MessageBody.dto';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { RoomsService } from 'src/rooms/rooms.service';

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(PrivateMessage)private pvtMsgRepository:Repository<PrivateMessage>
    ,@InjectRepository(GroupMessage) private grpMsgRepository:Repository<GroupMessage>
    ,private readonly roomservice:RoomsService){}
    async create(messageBody:MessageBodyDto) {
        if(messageBody.roomId)
        {
            let newMessage= await this.grpMsgRepository.create(messageBody)
            let newRoom= new Room()
            newRoom.id=messageBody.roomId
            let newUser= new User()
            newUser.id = messageBody.senderId as any
            newMessage.room=newRoom
            newMessage.sender= newUser
             await this.grpMsgRepository.insert(newMessage)
             return newMessage
        }
        if(messageBody.receiverId)
        {
            let newMessage= await this.pvtMsgRepository.create(messageBody)
            let newReceiver= new User()
            newReceiver.id=messageBody.receiverId as any
            let newSender= new User()
            newSender.id = messageBody.senderId as any
            newMessage.receiver=newReceiver
            newMessage.sender= newSender
            await this.pvtMsgRepository.insert(newMessage)
            return newMessage
        }
  
    }
    async getRoomsofUser(userId)
  {
      let rooms =await this.roomservice.findAll(userId)
      let roomIds=rooms.map(room=>room.id)
      return roomIds
  }
    
    async find(userId) {
        let roomIds= await this.getRoomsofUser(userId)
        let grpMessage= await this.getRoomMessages(roomIds)
        let pvtMessage= await this.getPrivateMessages(userId)
        const grpMessagePerUser={}
        grpMessage.forEach((msg)=>{
            if(grpMessagePerUser[msg.room.id])//room exists
            {
                grpMessagePerUser[msg.room.id].push({id:msg.id,message:msg.message,
                    senderId:msg.sender.id,roomId:msg.room.id})
            }
            else
            {
                grpMessagePerUser[msg.room.id]=[{id:msg.id,message:msg.message,
                    senderId:msg.sender.id,roomId:msg.room.id}]
            }
        })
        const pvtMessagePerUser={}
        pvtMessage.forEach((msg)=>{
            let otherUser= msg.sender.id==userId?msg.receiver.id:msg.sender.id;
            if(pvtMessagePerUser[otherUser])//message chat exists
            {
                pvtMessagePerUser[otherUser].push({id:msg.id,message:msg.message,
                senderId:msg.sender.id,receiverId:msg.receiver.id})
            }
            else
            {   
                // pvtMessagePerUser[otherUser]={name:msg.sender.id==userId?msg.receiver.name:msg.sender.name,messages:[]}
                pvtMessagePerUser[otherUser]=[{id:msg.id,message:msg.message,
                    senderId:msg.sender.id,receiverId:msg.receiver.id}]
            }
        })
        return {grpMessagePerUser,pvtMessagePerUser}
        
    }
    async getRoomMessages(roomIds:string[])
    {
        let grpMessage= await this.grpMsgRepository.find({
            // select:{message:true,sender:true,room:true},
            relations:{sender:true,room:true},
            where:{room:{id:In(roomIds)}},order:{createdAt:'ASC'}
        })
        return grpMessage

    }
    async getPrivateMessages(userId)
    {
        let pvtMessage= await this.pvtMsgRepository.find({
            relations:{sender:true,receiver:true},
            where:[{sender:{id:userId}},{receiver:{id:userId}}],order:{createdAt:'ASC'}
        });
        // console.log(pvtMessage)
        return pvtMessage

    }

}
