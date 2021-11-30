import {
  Body,
  Controller,
  Get, HttpCode, NotFoundException,
  Post, Query, Render,
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
  async login(@Req() request, @Body() req, @Res({ passthrough: true }) response){
    const {auth} = request.cookies
    if (!auth) {
      const {_id} = await this.authService.validateUser(req.username, req.password)
      if (!_id) {
      } else {
        response.cookie('auth', _id)
        response.redirect('/profile')
      }
    }else{
      response.redirect('/profile')
    }
  }

  @Get('auth/login')
  @Render('login')

  @Get('auth/login')
  @Render('login')

  @Get('home')
  @Render('home')
  async getMenu(@Req() request, @Res({ passthrough: true }) response){
    const {auth} = request.cookies
    if (!auth){
      response.redirect('/auth/login')
    }
    return await this.authService.findUserById(auth)
  }

  @Get('profile')
  @Render('profile')
  async getProfile(@Req() request, @Res({ passthrough: true }) response) {
    const {auth} = request.cookies
    if (!auth){
      response.redirect('/auth/login')
    }
    return await this.authService.findUserById(auth);
  }
}
