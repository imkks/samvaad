import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @ManyToOne(()=>User,user=>user.id)
    createdBy:User
    @JoinTable()
    @ManyToMany(()=>User,user=>user.id)
    members:User[]


}
