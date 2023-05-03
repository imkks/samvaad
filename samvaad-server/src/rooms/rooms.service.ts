import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepository:Repository<Room>){}
  async create(createRoomDto: CreateRoomDto,userId) {
    let newRoom = await this.roomRepository.create(createRoomDto)
    let user = new User();
    // console.log(userId)
    user.id=userId
    newRoom.createdBy=user;
    // console.log(newRoom)

    // newRoom["createdBy"]["id"]=userId;
    newRoom["members"]=[]
    // newRoom.members = createRoomDto.membersId.map(id => ({ id })) as any
    createRoomDto.membersId.forEach((memId,idx)=>{
      console.log(idx)
      newRoom.members[idx]={} as any;
      newRoom.members[idx]['id']=memId
    })
    //save calls both the table at once with insert you have to call it twice.
    await this.roomRepository.save(newRoom)
    return newRoom;
    // return 'This action adds a new room';
  }

  async findAll(userId) {
    
      return await this.roomRepository.find({
      // relations:{createdBy:true,members:true},
      where:[{createdBy:{id:userId}},{members:{id:userId}}]}
      )
  }
  
  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
