import {User} from "../../src/auth/auth.entity";

export interface SignUpResponse {
    statusCode: number;
    message: string;
    user: User;
}