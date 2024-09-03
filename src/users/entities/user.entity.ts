import { formatDate } from "src/utils/date";
import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

export enum Role {
    ADMIN = 'Admin',
    USER = 'User',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    username!: string;

    @Column({unique: true})
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
