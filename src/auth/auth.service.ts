import {Injectable} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {User} from "./auth.entity";
import {v4 as uuid} from 'uuid';
import {Jwt} from "./jwt.strategy";
import {sign} from 'jsonwebtoken';
import {hashPwd} from "../utils/hashPwd";
import {Response} from "express";
import {ResetDto} from "./dto/reset.dto";
import {LoginResponse, SignUpResponse, ResetPasswordResponse} from "../../types";


@Injectable()
export class AuthService {

    private createToken(createTokenId: string): {
        accessToken: string;
        expiresIn: number;
    } {
        const payLoad: Jwt = {id: createTokenId};
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(
            payLoad,
            'nextekeyjioj*(HJ$!)$H!)$H)!$%!&)(*#@IJKNM!QASXCVNM<>LKJHGFDSAQWERTYUIOP{+_)(*&^%$#@!!!!QWERTYUIO)_{::::><M?ukryć',
            {expiresIn},
        );
        return {
            accessToken,
            expiresIn,
        };
    }

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOneBy({accessToken: token});
        } while (!!userWithThisToken);
        user.accessToken = token;
        await user.save();
        return token;
    }

    async signUp(authDto: AuthDto): Promise<SignUpResponse> {
        const user = new User();
        user.email = authDto.email;
        user.passwordHash = hashPwd(authDto.password);
        await user.save();
        return {
            message: 'Poprawna rejestracja',
            statusCode: 202,
            user,
        };
    }

    async signIn(authDto: AuthDto, res: Response): Promise<LoginResponse> {
        try {
            const user = await User.findOneBy({
                email: authDto.email,
                passwordHash: hashPwd(authDto.password),
            });
            if (!user) {
                res.status(404).end();
                return {
                    message: 'Niepoprawne dane',
                    statusCode: 404,
                };
            }
            const token = await this.createToken(await this.generateToken(user));
            res
                .cookie('jwt', token.accessToken, {
                    secure: false, //tu ustawiamy true jeśli jest https (czyli na produkcji)
                    domain: 'localhost', //tu domenę
                    httpOnly: true,
                    sameSite: 'lax',
                })
                .status(200);
            return {
                message: 'Poprawne dane',
                statusCode: 200,
                user,
            };
        } catch (e) {
            res
                .status(404)
                .end();
            return {
                message: e.message,
                statusCode: 404,
            }
        }
    }

    async resetPassword(resetDto: ResetDto, res: Response): Promise<ResetPasswordResponse> {
        try {
            const user = await User.findOneBy({
                accessToken: resetDto.token,
            });
            if (user === null) {
                res.status(404).end();
                close();
            }
            user.passwordHash = hashPwd(resetDto.password);
            await user.save();
            return {
                message: 'Poprawna zmiana hasła',
                statusCode: 202,
                user: user,
            };
        } catch (e) {
            res
                .status(404)
                .end();
            return {
                message: e.message,
                statusCode: 404,
            }
        }
    }

}