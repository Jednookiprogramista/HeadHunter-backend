import {
  IsArray,
  IsEmail,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class StudentDto {
  @IsEmail()
  @MaxLength(190)
  email: string;

  @Min(0)
  @Max(5)
  courseCompletion: number;

  @Min(0)
  @Max(5)
  courseEngagement: number;

  @Min(0)
  @Max(5)
  projectDegree: number;

  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsArray()
  bonusProjectUrls: string[];

  @MaxLength(40)
  githubUsername: string;

  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @MinLength(2)
  @MaxLength(40)
  lastName: string;

  @IsArray()
  projectUrls: string[];
}

export const dummyCSVWithProblematicData = `email;courseCompletion;courseEngagement;projectDegree;teamProjectDegree;bonusProjectUrls
jakub.am2017@gmail.com;-30;0.00;-999999;-400000;https://github.com/jakub-am
randombad.com.eu;5;5;5;5,00;https://github.com/Jednookiprogramista
paulina.a.gaweda@gmail.com;4,92;4,93;4,94;4,95;https://github.com/PaulaaGS
bravo1_lima1@yahoo.com;5;5;5;5,00;https://github.com/L00ka5z78
fakeemailnotat.com;5;5;5;3,90;https://github.com/krystian2077
karolina.sylwia.banach@gmail.com;5;5;5;5,00;https://github.com/KarolinaSylwiaBanach
matir85@gmail.com;5;5;5;5,00;https://github.com/matir85
kowalski.k.1997@gmail.com;5;5;5;5,00;https://github.com/kowalskika
zledane001@gmail.com;3;3;3;3,00;http://guthub.pl/zledane001
ŻŹŁĘDANĘ002#@gmail.com;2;1;5;6,00;https://github.pl/zledane002
";DROP TABLE students;";4;3;1;2,00;https://github.com/ok
"<script>alert('hackd');</script>";3;3;3;3,00;https://github.com/goliato0oggg
złedane003@gmail.com;trzy;null;3;3,00;https:/github.com/anontymooooos`;

export const dummyCSV = `email;courseCompletion;courseEngagement;projectDegree;teamProjectDegree;bonusProjectUrls
paulina.a.gaweda@gmail.com;4,923;4,93;4,94;4,95;https://github.com/PaulaaGS
bravo1_lima1@yahoo.com;5;5;5;5,00;https://github.com/L00ka5z78
fakeemailnotat.com;5;5;5;3,90;https://github.com/krystian2077
karolina.sylwia.banach@gmail.com;5;5;5;5,00;https://github.com/KarolinaSylwiaBanach
matir85@gmail.com;5;5;5;5,00;https://github.com/matir85
kowalski.k.1997@gmail.com;5;5;5;5,00;https://github.com/kowalskika`;
