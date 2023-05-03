import { Room } from "src/rooms/entities/room.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PrivateMessage
{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    message:string;
    @CreateDateColumn()
    createdAt:Date;
    @ManyToOne(()=>User,(user)=>user.id)
    sender:User
    @ManyToOne(()=>User,(user)=>user.id)
    receiver:User
    

}