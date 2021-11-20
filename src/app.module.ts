import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TeacherModule} from "./content/teacher/teacher.module";
import {ClassModule} from "./content/class/class.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://user123:userpass@cluster0.mxhim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    TeacherModule,
    ClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
