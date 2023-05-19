import { IsEmail, Max, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Student } from '../student/student.entity';
import { User } from '../auth/auth.entity';

@Entity()
@Unique(['email'])
export class HR {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 190,
  })
  @IsEmail()
  email: string;

  @Column({
    length: 60,
  })
  fullName: string;

  @Column({
    length: 175,
  })
  company: string;

  @Column({
    type: 'int',
  })
  @Min(1)
  @Max(999)
  maxReservedStudents: number;

  @OneToMany(() => Student, (student) => student.hr)
  students: Student[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
