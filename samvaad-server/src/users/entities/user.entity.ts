import { Logger } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from  'bcrypt'
import { Exclude } from "class-transformer";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    email:string;
    @Exclude()
    @Column()
    hashedPassword:string;
    async comparePassword(passwordInPlainText){
        console.log(passwordInPlainText,this.hashedPassword)
        
        try{
            return  await bcrypt.compare(passwordInPlainText,this.hashedPassword)


        }
        catch(error)
        {
            Logger.debug(error)
        }
        

    }

}
