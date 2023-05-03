import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { SignUpDto } from './dto/signup.dto';
import { Response } from 'express';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto,@Res()response:Response) {
    const {access_token,foundUser} = await this.authenticationService.login(loginDto);
    response.cookie('Authentication',access_token,{httpOnly:true,maxAge:300*1000})
    // let exp=Date.now()+300*1000
    // console.log(new Date(exp))
    response.json({...foundUser,exp:Date.now()+300*1000})

    
  }

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDto, @Res() response:Response) {

    const {access_token,createdUser}=await this.authenticationService.signup(signUpDto);
    response.cookie('Authentication',access_token,{maxAge:300*1000})
    response.json({...createdUser,exp:Date.now()+300*1000})
  }
  @Post('/signout')
  async signout( @Res() response:Response) {

    
    response.cookie('Authentication','',{maxAge:300*1000})
    response.send('User Logged out')
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authenticationService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authenticationService.update(+id, updateAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
