import { formatDate } from "src/utils/date";
import { Column, Entity, PrimaryGeneratedColumn, Unique, } from "typeorm";

export enum Role {
    ADMIN = 'Admin',
    USER = 'User',
}

@Unique('UNIQUE_USERNAME', ['username'])
@Unique('UNIQUE_EMAIL', ['email'])
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column({select: false})
    password!: string;

    @Column({default: Role.USER})
    role!: Role;

    @Column({default: true})
    isActive!: boolean;

    @Column({default: formatDate(new Date())})
    createdAt!: string;

}
