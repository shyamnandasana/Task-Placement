import { Controller, Post, Get, Body, UseGuards, Param, ValidationPipe, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/course.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Courses')
@Controller('api/courses')
export class CourseController {
    constructor(private courseService: CourseService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createCourse(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active courses' })
    async getAllCourses() {
        return this.courseService.getAllCourses();
    }

    @Get('available/list')
    @ApiOperation({ summary: 'Get courses with available capacity' })
    async getAvailableCourses() {
        return this.courseService.getAvailableCourses();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get course by ID' })
    async getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update course (admin only)' })
    async updateCourse(
        @Param('id') id: string,
        @Body(ValidationPipe) updateData: Partial<CreateCourseDto>,
    ) {
        return this.courseService.updateCourse(id, updateData);
    }
}
