import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormconfig } from './config/typeorm.config';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormconfig),ChatModule, UsersModule, AuthenticationModule, RoomsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
