import {User} from "../../src/auth/auth.entity";

export interface ResetPasswordResponse {
    message: string;
    statusCode: number;
    user?: User;
}