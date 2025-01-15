import { Contains, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({description:"User username", example : "UserExample"})
    @IsNotEmpty()
    @MinLength(3)
    username!: string;

    @ApiProperty({description: "User email", example: "user.example@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @ApiProperty({description: "User password", example: "Password1234*"})
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    role!: Role;

    @IsNotEmpty()
    isActive!: boolean;

    @IsNotEmpty()
    createdAt!: Date;
}
