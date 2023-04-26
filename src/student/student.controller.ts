import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import {
  CreateStudentResponse,
  GetListOfStudentsResponse,
  GetOneStudentResponse,
  UpdateStudentResponse,
} from '../interfaces/student';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storageDir } from '../utils/storage-csv';
import { MulterDiskUploadedFiles } from '../interfaces/multer-files';

@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/')
  getListOfStudents(): Promise<GetListOfStudentsResponse> {
    return this.studentService.getListOfStudents();
  }

  @Get('/:id')
  getOneStudent(@Param('id') id: string): Promise<GetOneStudentResponse> {
    return this.studentService.getOneStudent(id);
  }

  @Delete('/:id')
  removeStudent(@Param('id') id: string): Promise<void> {
    return this.studentService.removeStudent(id);
  }

  @Post('/')
  createStudent(@Body() newStudent: Student): Promise<CreateStudentResponse> {
    return this.studentService.createStudent(newStudent);
  }

  @Put('/:id')
  updateStudent(
    @Param('id') id: string,
    @Body() updatedStudent: Student,
  ): Promise<UpdateStudentResponse> {
    return this.studentService.updateStudent(id, updatedStudent);
  }

  @Post('/import')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'csvFile',
          maxCount: 1,
        },
      ],
      {
        dest: path.join(storageDir(), 'import-file'),
      },
    ),
  )
  importStudentsCsv(
    @UploadedFiles() file: MulterDiskUploadedFiles,
  ): Promise<{ success: true }> {
    return this.studentService.importStudentsCsv(file);
  }
}
