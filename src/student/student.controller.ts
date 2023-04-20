import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('/create')
  addStudent(@Body() newStudent: StudentDto) {
    return this.studentService.createStudent(newStudent);
  }

  @Get('/list-all')
  getAll() {
    return this.studentService.listAllStudents();
  }

  @Get('/get-one/:id')
  getOneStudent(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Patch('/update/:id')
  updateStudent(@Param('id') id: string) {
    return this.studentService.updateStudent(id);
  }

  @Delete('/delete/:id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.removeStudent(id);
  }

  @Post('/import')
  importStudentsCsv(@Body() csvFile: string) {
    return this.studentService.importStudentsCsv(csvFile);
  }
}
