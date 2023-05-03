import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private readonly jwtService:JwtService){}
    canActivate(context:ExecutionContext)
    {
           const request= context.switchToHttp().getRequest()

           return this.validate(request)
    }
    validate(request:Request)
    {
        try {
        let payload= this.jwtService.verify( request.cookies?.Authentication);
            request["user"]=payload;
            return true;
            
        } catch (error) {
                console.error(error)
                return false;
        }
    }
}