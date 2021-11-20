import {IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class ClassDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(54)
    credits: number
}
export class InsertClassDto {
    @IsNotEmpty()
    @IsString()
    name: string
}