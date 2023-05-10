import {User} from "../../src/auth/auth.entity";

export interface LoginResponse {
    message: string;
    statusCode: number;
    user?: User;
}