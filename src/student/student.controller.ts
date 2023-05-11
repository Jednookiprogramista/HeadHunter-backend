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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import {
  CreateStudentResponse,
  UpdateStudentResponse,
} from '../interfaces/student';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { AvailableStudent, GetOneStudentResponse } from '../../types';
import { Criteria } from '../interfaces/criteria';
import { MulterDiskUploadedFiles } from '../interfaces/multer-files';
import { storageDir } from '../utils/storage-csv';

@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/available-list')
  availableStudents(@Body() criteria: Criteria): Promise<AvailableStudent[]> {
    return this.studentService.getAvailableStudents(criteria);
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
