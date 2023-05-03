import { IsArray, IsOptional, IsString } from "class-validator";

export class MessageBodyDto {
    @IsString()
    message:string;
    @IsString()
    senderId:string;
    @IsString()
    @IsOptional()
    roomId?:string;
    @IsOptional()
    @IsString()
    receiverId?:string;
        


}
