import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from 'src/authentication/authguard';
import { MessageBodyDto } from './dto/MessageBody.dto';

@Controller('messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {

  }
  @Post()
  create(@Req() req,@Body() messageBodyDto:MessageBodyDto) {
    // console.log(req.user)
    return this.messagesService.create(messageBodyDto);
  }
  @Get()
  find(@Req() req) {
    // console.log(req.user)
    return this.messagesService.find(req.user.id);
  }

}
