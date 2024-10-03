import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDTO {

    @ApiProperty({ description: "User username", example: "UserExample" })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: "User password", example: "Password1234$" })
    @IsNotEmpty()
    @IsString()
    password: string;
}
