import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TeacherModule} from "./content/teacher/teacher.module";
import {ClassModule} from "./content/class/class.module";
import {AuthModule} from "./authentication/auth/auth.module";
import { AuthController } from './authentication/auth/auth.controller';
import {UserController} from "./authentication/user/user.controller";
import {UserModule} from "./authentication/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI')
      }),
      inject:[ConfigService]
    }),
    TeacherModule,
    ClassModule,
    AuthModule,
    UserModule],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService],
})
export class AppModule {}
