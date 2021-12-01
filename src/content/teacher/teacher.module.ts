import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Teacher, TeacherSchema} from "../schemas/teacher.schema";
import {TeacherService} from "./teacher.service";
import {TeacherController} from "./teacher.controller";
import {Class, ClassSchema} from "../schemas/class.schema";
import {UserModule} from "../../authentication/user/user.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema },{ name: Class.name, schema: ClassSchema }]),
        UserModule],
    providers: [TeacherService],
    controllers: [TeacherController]
})
export class TeacherModule {}
