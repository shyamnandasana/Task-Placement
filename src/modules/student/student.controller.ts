import { Controller, Post, Get, Body, Param, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { RegisterStudentDto } from './dto/student.dto';

@ApiTags('Students')
@Controller('api/students')
export class StudentController {
    constructor(private studentService: StudentService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new student' })
    async registerStudent(@Body(ValidationPipe) registerStudentDto: RegisterStudentDto) {
        return this.studentService.registerStudent(registerStudentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active students' })
    async getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get student by ID' })
    async getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(id);
    }

    @Get(':id/courses')
    @ApiOperation({ summary: 'Get enrolled courses for a student' })
    async getStudentCourses(@Param('id') id: string) {
        return this.studentService.getStudentEnrolledCourses(id);
    }
}
