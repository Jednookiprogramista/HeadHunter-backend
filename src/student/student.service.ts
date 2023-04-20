import { Injectable } from '@nestjs/common';
import { dummyCSV, StudentDto } from './dto/student.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as Papa from 'papaparse';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async listAllStudents(): Promise<void> {}

  async getStudentById(id: string) {
    // await NazwaZentity.getOne(id)
  }

  async updateStudent(id: string) {}

  async createStudent(newStudent: StudentDto) {}

  async removeStudent(id: string) {
    // await NazwaZentity.delete(id)
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
      studentData.githubUsername = studentData.email; // @TODO Unique index required unique value
      studentData.projectUrls = [];

      const student = await this.dataSource
        .createQueryBuilder(Student, 'S')
        .select(['S.id', 'S.email'])
        .where('S.email = :email', { email: studentData.email })
        .getOne();

      let studentId: string;
      if (!student) {
        const newStudent = await this.dataSource
          .createQueryBuilder(Student, 'S')
          .insert()
          .values(studentData)
          .execute();
        studentId = newStudent.identifiers[0].id;
      }
    }
  }
}
