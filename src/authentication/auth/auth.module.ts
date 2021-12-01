import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthController} from './auth.controller';
import {LocalStrategy} from "./local.strategy";


@Module({
    imports: [
        UserModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        ConfigModule
    ],
    providers: [AuthService, LocalStrategy, ConfigService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
