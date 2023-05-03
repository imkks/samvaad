import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {  LoginDto } from './dto/login.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthenticationService {
  constructor(private usersService:UsersService,private jwtService:JwtService){}
  async signup(createAuthenticationDto: SignUpDto) {
    try {
          const foundUser=await this.usersService.findAll({email:createAuthenticationDto.email});
          // console.log(foundUser)
          if(foundUser[0])
            throw new HttpException('User already Exist',HttpStatus.BAD_REQUEST)
         const createdUser= await this.usersService.create(createAuthenticationDto);
        //  console.log(createdUser)
         return {access_token:this.jwtService.sign({...createdUser}),
          createdUser};
      
    } catch (error) {
      console.error(error)
      throw new HttpException(error.message,HttpStatus.BAD_GATEWAY);
      
    }
    
  }
  async login(loginDto:LoginDto) {
    try {
      const foundUser=await this.usersService.findAll({email:loginDto.email});
      if(!foundUser)
        throw new HttpException('User Not Found',HttpStatus.BAD_REQUEST)
     let isPasswordMatched= await foundUser[0].comparePassword(loginDto.password)
      if(!isPasswordMatched)
        throw new HttpException('Wrong Credentials',HttpStatus.BAD_REQUEST)
    //  const createdUser= await this.usersService.create(createAuthenticationDto);
     return {access_token:this.jwtService.sign({...foundUser[0]}),
      foundUser:foundUser[0]};
  
} catch (error) {
  console.error(error)
  throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
  
}
  }

async getUserFromToken(token)
{
  try {
     return this.jwtService.verify(token)

    
  } catch (error) {
      throw new Error(error.message)
  }
}
  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
