import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { SignUpDto } from 'src/authentication/dto/signup.dto';
import { LoginDto } from 'src/authentication/dto/login.dto';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)private userRepository:Repository<User>){}
  async create(signUpDto:SignUpDto) {
    try
    {
      const newUser= await this.userRepository.create(signUpDto);
      // console.log(newUser,signUpDto)
      let hashedPassword=await bcrypt.hash(signUpDto.password,10);
      newUser.hashedPassword=hashedPassword;
      // console.log(newUser,signUpDto)
      await this.userRepository.insert(newUser);
      newUser.hashedPassword=undefined
      return newUser;
    }
    catch(e)
    {
        throw new HttpException(e.message,503)
    }
  }
  
  async findAll(wherecondition:FindUserDto) {
    // console.log(wherecondition)
    try {
      const foundUsers=await this.userRepository.find({where:wherecondition});
    return foundUsers;
    } catch (error) {
      throw new HttpException(error.message,503)
      
    }
    
  }
  async search(wherecondition:FindUserDto) {
    // console.log(wherecondition)
    try {
      const foundUsers=await this.userRepository.find({where:{name:Like(`%${wherecondition.name?wherecondition.name:''}%`),
      email:Like(`%${wherecondition.email?wherecondition.email:''}%`)}});
    return foundUsers;
    } catch (error) {
      throw new HttpException(error.message,503)
      
    }
    
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
