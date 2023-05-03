import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[JwtModule.register({global:true,secret:'Mysecret',signOptions:{expiresIn:'300s'}}),UsersModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports:[AuthenticationService]
})
export class AuthenticationModule {}
