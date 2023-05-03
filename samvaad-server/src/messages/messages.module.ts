import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMessage } from './entity/groupmessage.entity';
import { PrivateMessage } from './entity/privatemessage.entity';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports:[RoomsModule,TypeOrmModule.forFeature([GroupMessage,PrivateMessage])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports:[MessagesService]
})
export class MessagesModule {}
