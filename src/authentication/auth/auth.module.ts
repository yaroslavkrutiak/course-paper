import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
// import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {PassportModule} from '@nestjs/passport';
// import {JwtStrategy} from "./jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthController} from './auth.controller';
import {LocalStrategy} from "./local.strategy";


@Module({
    imports: [
        UserModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
/*        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: configService.get<string>('JWT_EXPIRES_IN')},
            }),
            inject: [ConfigService]
        }),*/
        ConfigModule
    ],
    providers: [AuthService,/* JwtStrategy,*/ LocalStrategy, ConfigService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
