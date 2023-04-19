import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  /** zamiast ANY wstawimy tam nazwe z entity. Np User, Student czy jak to sobie nazwiemy  */

  async signUp(authDto: AuthDto): Promise<any> {}

  async signIn(authDto: AuthDto, res) {
    console.log(authDto);
    try {
      const user = await User.findOneBy({
        email: authDto.email,
        passwordHash: authDto.password,
      });
      if (!user) {
        return res.json({ message: 'Invalid signIn data' });
      }
      console.log(user);
    } catch (e) {
      return res.json({ message: 'login successful' });
    }
  }
}
