import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ResetDto } from './dto/reset.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response) {
    return this.authService.signUp(dto, res);
  }

  @Post('/signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    return this.authService.signIn(dto, res);
  }

  @Post('/recover')
  async recover(@Body() dto: ResetDto, @Res() res: Response) {
    return this.authService.resetPassword(dto, res);
  }
}
