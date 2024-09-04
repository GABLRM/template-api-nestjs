import { Contains, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";

export class UpdateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password!: string;
}
