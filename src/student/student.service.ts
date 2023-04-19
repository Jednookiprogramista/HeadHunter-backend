import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor() {}

  async listAllStudents(): Promise<void> {}

  async getStudentById(id: string) {
    // await NazwaZentity.getOne(id)
  }

  async updateStudent(id: string) {}

  async createStudent(newStudent: StudentDto) {}

  async removeStudent(id: string) {
    // await NazwaZentity.delete(id)
  }
}
