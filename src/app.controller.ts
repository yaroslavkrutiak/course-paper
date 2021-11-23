import {
  Body,
  Controller,
  Get, HttpCode, NotFoundException,
  Post, Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthService} from "./authentication/auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly authService: AuthService,
              ) {}

  @Post('auth/login')
  @HttpCode(200)
  async login(@Body() req, @Res({ passthrough: true }) response){
    const {_id, username} = await this.authService.validateUser(req.login, req.password)
    if (!_id){
      throw new NotFoundException();
    }else {
      response.cookie('auth', _id)
      return {username}
    }
  }

  @Get('profile')
  async getProfile(@Req() request) {
    const {auth} = request.cookies
    const user = await this.authService.findUserById(auth)
    if (!user){
      throw new UnauthorizedException()
    }
    return user;
  }
}
