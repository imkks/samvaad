import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';


@Module({
  imports:[MessagesModule,AuthenticationModule],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}
