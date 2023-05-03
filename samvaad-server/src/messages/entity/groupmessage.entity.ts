import { Room } from "src/rooms/entities/room.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GroupMessage
{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    message:string;
    @CreateDateColumn()
    createdAt:Date;
    @JoinColumn()
    @ManyToOne(()=>User,(user)=>user.id)
    sender:User
    @JoinColumn()
    @ManyToOne(()=>Room,(room)=>room.id)
    room:Room
    

}