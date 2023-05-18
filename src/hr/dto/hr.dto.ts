import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

export class HRDto {
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  company: string;

  @Min(1)
  @Max(999)
  maxReservedStudents: number;
}
