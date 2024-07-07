import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("string")
    email: string;

    @Column("string")
    password: string;
}
