import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsEmail, Max, MaxLength, Min } from 'class-validator';
import { ExpectedTypeWork } from '../enums/expected-type-work';
import { ExpectedContractType } from '../enums/expected-contract-type';
import { HR } from '../hr/hr.entity';

@Entity()
@Unique(['email'])
@Unique(['githubUsername'])
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 190,
  })
  @IsEmail()
  email: string;

  @Column({
    length: 20,
    default: null,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    length: 20,
  })
  firstName: string;

  @Column({
    length: 40,
  })
  lastName: string;

  @Column({
    length: 39,
  })
  githubUsername: string;

  @Column({
    type: 'simple-array',
    default: null,
    nullable: true,
  })
  portfolioUrls: string[];

  @Column({
    type: 'simple-array',
  })
  projectUrls: string[];

  @Column({
    length: 1000,
    default: null,
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'enum',
    enum: ExpectedTypeWork,
    default: ExpectedTypeWork.IRRELEVANT,
  })
  expectedTypeWork: ExpectedTypeWork;

  @Column({
    length: 60,
    default: null,
    nullable: true,
  })
  targetWorkCity: string;

  @Column({
    type: 'enum',
    enum: ExpectedContractType,
    default: ExpectedContractType.IRRELEVANT,
  })
  expectedContractType: ExpectedContractType;

  @Column({
    length: 10,
    default: null,
    nullable: true,
  })
  expectedSalary: string;

  @Column({
    default: false,
  })
  canTakeApprenticeship: boolean;

  @Column({
    type: 'tinyint',
    unsigned: true,
    default: 0,
  })
  monthsOfCommercialExp: number;

  @Column({
    type: 'text',
    default: null,
    nullable: true,
  })
  @MaxLength(10000)
  education: string;

  @Column({
    type: 'text',
    default: null,
    nullable: true,
  })
  @MaxLength(10000)
  workExperience: string;

  @Column({
    type: 'text',
    default: null,
    nullable: true,
  })
  @MaxLength(10000)
  courses: string;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
    default: null,
    nullable: true,
  })
  // @Min(0)
  // @Max(5)
  courseCompletion: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
    default: null,
    nullable: true,
  })
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
    default: null,
    nullable: true,
  })
  @Min(0)
  @Max(5)
  projectDegree: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
    default: null,
    nullable: true,
  })
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @Column({
    type: 'simple-array',
    default: null,
    nullable: true,
  })
  bonusProjectUrls: string[];

  @ManyToOne(() => HR, (hr) => hr.students)
  hr: HR;
}
