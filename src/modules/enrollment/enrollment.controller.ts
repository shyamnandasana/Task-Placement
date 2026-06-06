import { Controller, Post, Get, Body, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { EnrollStudentDto } from './dto/enrollment.dto';

@ApiTags('Enrollments')
@Controller('api/enrollments')
export class EnrollmentController {
    constructor(private enrollmentService: EnrollmentService) { }

    @Post()
    @ApiOperation({ summary: 'Enroll a student in a course' })
    async enrollStudent(@Body(ValidationPipe) enrollStudentDto: EnrollStudentDto) {
        return this.enrollmentService.enrollStudent(enrollStudentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active enrollments' })
    async getAllEnrollments() {
        return this.enrollmentService.getAllEnrollments();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get enrollment by ID' })
    async getEnrollmentById(@Param('id') id: string) {
        return this.enrollmentService.getEnrollmentById(id);
    }

    @Get('student/:studentId')
    @ApiOperation({ summary: 'Get all enrollments for a student' })
    async getStudentEnrollments(@Param('studentId') studentId: string) {
        return this.enrollmentService.getStudentEnrollments(studentId);
    }

    @Get('course/:courseId')
    @ApiOperation({ summary: 'Get all enrollments for a course' })
    async getCourseEnrollments(@Param('courseId') courseId: string) {
        return this.enrollmentService.getCourseEnrollments(courseId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Unenroll a student from a course' })
    async unenrollStudent(@Param('id') id: string) {
        return this.enrollmentService.unenrollStudent(id);
    }
}
