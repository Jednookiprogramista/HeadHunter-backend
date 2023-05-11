import { IsNotEmpty, IsString } from 'class-validator';

export class ResetDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
