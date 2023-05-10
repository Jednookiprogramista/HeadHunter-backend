import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import {Response} from "express";
import {ResetDto} from "./dto/reset.dto";
import {LoginResponse, ResetPasswordResponse, SignUpResponse} from "../../types";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("/signup")
  async signup(@Body() dto: AuthDto): Promise<SignUpResponse>{
    return this.authService.signUp(dto);
  }

  @Post("/signin")
  async signin(@Body() dto: AuthDto,
               @Res() res: Response): Promise<LoginResponse> {
    return this.authService.signIn(dto, res);
  }

  @Post("/recover")
  async recover(@Body() dto: ResetDto,
                @Res() res: Response): Promise<ResetPasswordResponse> {
    return this.authService.resetPassword(dto, res);
  }
}
