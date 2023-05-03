import { IsOptional } from "class-validator";

export class FindUserDto
{
    @IsOptional()
    name?:string;
    @IsOptional()
    email?:string;

}