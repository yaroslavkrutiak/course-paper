import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TeacherModule} from "./content/teacher/teacher.module";
import {ClassModule} from "./content/class/class.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./authentication/auth/jwt-auth.guard";
import {AuthModule} from "./authentication/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    TeacherModule,
    ClassModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule {}
