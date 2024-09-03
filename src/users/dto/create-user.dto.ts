import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    role!: Role;

    @IsNotEmpty()
    isActive!: boolean;

    @IsNotEmpty()
    createdAt!: Date;
}
