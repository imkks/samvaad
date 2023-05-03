import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io/dist';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class ChatService {
    constructor(private readonly authenticationService :AuthenticationService){}
    async getUserFromSocket(socket:Socket)
    {
        try {
            let cookie=socket.handshake.headers?.cookie;
    // console.log(cookie)
        const { Authentication: authenticationToken } = parse(cookie)
        console.log(authenticationToken);
        return this.authenticationService.getUserFromToken(authenticationToken)
        } catch (error) {
            throw new WsException('Invalid Credentials')
        }
        
    }
}
