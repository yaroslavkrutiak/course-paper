import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ClassesEnum, SexEnum} from "../../constants/enums";

export class TeacherDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsNotEmpty()
    @IsEnum(SexEnum)
    sex: SexEnum

    @IsNotEmpty()
    @IsEnum(ClassesEnum)
    classes: ClassesEnum
}