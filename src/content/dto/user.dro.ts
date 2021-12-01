import {IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}