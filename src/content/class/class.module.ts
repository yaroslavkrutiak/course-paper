import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Class, ClassSchema} from "../schemas/class.schema";
import {UserModule} from "../../authentication/user/user.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    UserModule],
  providers: [ClassService],
  controllers: [ClassController]
})
export class ClassModule {}
