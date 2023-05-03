import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway,WebSocketServer, WsException } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { RoomsService } from 'src/rooms/rooms.service';
import { MessagesService } from 'src/messages/messages.service';
import { parse } from 'cookie'

@WebSocketGateway(
  {
//   // transports:['websocket'],
  cors:{origin:'http://localhost:3000',credentials:true}
}
)
export class ChatGateway implements OnGatewayConnection {

  constructor(private readonly chatService: ChatService,
    private readonly messageService:MessagesService) {}

  async handleConnection(socket:Socket)
  {
    try
    {
      let user= await this.chatService.getUserFromSocket(socket)
    socket["userId"]=user.id
    socket.join(socket["userId"])
    let rooms=await this.messageService.getRoomsofUser(socket["userId"]);
    rooms.forEach(room=>socket.join(room))
    }
    catch(e)
    {
      throw new WsException(e.message)
    }
    
    
    
    
  }
  @SubscribeMessage('send_message')
  async listenForMessages(@MessageBody() message,@ConnectedSocket()socket:Socket)
  {
      // socket
      await this.messageService.create(message);
      if(message.receiverId)
      socket.to(message.receiverId).emit('receive_message',message)
      if(message.roomId)
      socket.to(message.roomId).emit('receive_message',message)
  }
}
