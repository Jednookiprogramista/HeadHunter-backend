import { IsEmail, Max, Min } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Student } from '../student/student.entity';

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
}
