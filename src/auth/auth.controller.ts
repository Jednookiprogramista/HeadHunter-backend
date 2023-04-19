import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    return this.authService.signIn(dto, res);
  }

  @Get('/refresh')
  refresh() {}
  /** na chwilę obecną nie mam na to pomysłu */

  @Get('/logout')
  async logOut() {}
}
