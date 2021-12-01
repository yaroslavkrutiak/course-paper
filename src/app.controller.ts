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
import {UserService} from "./authentication/user/user.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly authService: AuthService,
              private readonly userService: UserService
              ) {}

  @Post('auth/login')
  @HttpCode(200)
  async login(@Req() request, @Body() req, @Res({ passthrough: true }) response){
    const {auth} = request.cookies
    if (!auth) {
      const user = await this.authService.validateUser(req.username, req.password)
      if (!user) {
        response.redirect('/auth/login')
      } else {
        response.cookie('auth', user._id)
        response.redirect('/home')
      }
    }else{
      response.redirect('/home')
    }
  }

  @Post('auth/logout')
  logout(@Req() request, @Res({ passthrough: true }) response){
    request.clearCookie('auth', {path: '/', domain: 'localhost'}).send();
    response.redirect('/auth/login')
  }

  @Get('auth/login')
  @Render('login')
  getLoginPage(){}

  @Post('auth/register')
  @HttpCode(200)
  async register(@Req() request, @Body() body, @Res({ passthrough: true }) response){
      const user = await this.userService.insertUser(body)
      if (!user) {
        response.redirect('/auth/login')
      } else {
        response.cookie('auth', user._id)
        response.redirect('/home')
      }
  }

  @Get()
  redirectToLogin(@Res({ passthrough: true }) response){
    response.redirect('/auth/login')
  }

  @Get('auth/register')
  @Render('register')
  getRegisterPage(){}

  @Get('home')
  @Render('home')
  getHomePage(){}

  @Get('profile')
  @Render('profile')
  async getProfile(@Req() request, @Res({ passthrough: true }) response) {
    const {auth} = request.cookies
    if (!auth){
      response.redirect('/auth/login')
    }
    return this.authService.findUserById(auth);
  }
}
