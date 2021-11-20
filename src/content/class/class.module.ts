import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Class, ClassSchema} from "../schemas/class.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }])],
  providers: [ClassService],
  controllers: [ClassController]
})
export class ClassModule {}
