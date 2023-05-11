import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './auth.entity';

export interface Jwt {
  id: string;
  role: string;
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey:
        'nextekeyjioj*(HJ$!)$H!)$H)!$%!&)(*#@IJKNM!QASXCVNM<>LKJHGFDSAQWERTYUIOP{+_)(*&^%$#@!!!!QWERTYUIO)_{::::><M?ukryć',
    });
  }

  async validate(payload: Jwt, done: (error, user) => void) {
    if (!payload || !payload.id || !payload.role) {
      return done(new UnauthorizedException(), false);
    }
    const user = await User.findOne({ where: { accessToken: payload.id } });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    user.role = payload.role;
    done(null, user);
  }
}
