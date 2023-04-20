import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import {
  CreateStudentResponse,
  GetListOfStudentsResponse,
  UpdateStudentResponse,
} from '../interfaces/student';
import { dummyCSV, StudentDto } from './dto/student.dto';
import * as Papa from 'papaparse';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getListOfStudents(): Promise<GetListOfStudentsResponse> {
    return await this.studentRepository.find();
  }

  async getOneStudent(id: string): Promise<Student> {
    return await this.studentRepository.findOneByOrFail({ id });
  }

  async removeStudent(id: string): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async createStudent(newStudent: Student): Promise<CreateStudentResponse> {
    return await this.studentRepository.save(newStudent);
  }

  async updateStudent(
    id: string,
    updatedStudent: Student,
  ): Promise<UpdateStudentResponse> {
    await this.studentRepository.update(id, updatedStudent);
    return this.getOneStudent(id);
  }

  async importStudentsCsv(csvFile: string) {
    // @TODO fix validator issue
    const arrayOfCsvHeaders = [
      'courseCompletion',
      'courseEngagement',
      'projectDegree',
      'teamProjectDegree',
    ];
    const csvParsed: StudentDto[] = Papa.parse(dummyCSV, {
      header: true,
      transform: function (value, header) {
        if (arrayOfCsvHeaders.includes(header)) {
          return Number(value.replace(',', '.')).toFixed(2);
        } else {
          return value;
        }
      },
    }).data;

    for (const studentCsvData of csvParsed) {
      const studentData = new StudentDto();
      studentData.email = studentCsvData.email;
      studentData.courseCompletion = studentCsvData.courseCompletion;
      studentData.courseEngagement = studentCsvData.courseEngagement;
      studentData.projectDegree = studentCsvData.projectDegree;
      studentData.teamProjectDegree = studentCsvData.teamProjectDegree;
      studentData.bonusProjectUrls = studentCsvData.bonusProjectUrls;

      // compulsory data to insert into Student table
      studentData.firstName = '';
      studentData.lastName = '';
      studentData.githubUsername = '';
      studentData.projectUrls = [];

      const student = await this.studentRepository
        .createQueryBuilder('S')
        .select(['S.id', 'S.email'])
        .where('S.email = :email', { email: studentData.email })
        .getOne();

      let studentId: string;
      if (!student) {
        const newStudent = await this.studentRepository
          .createQueryBuilder('S')
          .insert()
          .values(studentData)
          .execute();
        studentId = newStudent.identifiers[0].id;
      }
    }
  }
}
