import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../../common/schemas/course.schema';
import { CreateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<Course>,
    ) { }

    async createCourse(createCourseDto: CreateCourseDto) {
        const existingCourse = await this.courseModel.findOne({
            courseCode: createCourseDto.courseCode
        });
        if (existingCourse) {
            throw new ConflictException('Course with this code already exists');
        }

        const course = await this.courseModel.create(createCourseDto);
        return course;
    }

    async getAllCourses() {
        const courses = await this.courseModel.find({ isActive: true });
        return courses;
    }

    async getCourseById(id: string) {
        const course = await this.courseModel.findById(id);
        if (!course) {
            throw new NotFoundException('Course not found');
        }
        return course;
    }

    async getAvailableCourses() {
        const courses = await this.courseModel.find({
            isActive: true,
            $expr: { $lt: ['$enrolledCount', '$maxCapacity'] },
        });
        return courses;
    }

    async updateCourse(id: string, updateData: Partial<CreateCourseDto>) {
        const course = await this.courseModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true },
        );
        if (!course) {
            throw new NotFoundException('Course not found');
        }
        return course;
    }

    async checkEnrollmentCapacity(courseId: string): Promise<boolean> {
        const course = await this.getCourseById(courseId);
        return course.enrolledCount < course.maxCapacity;
    }

    async checkDuplicateEnrollment(studentId: string, courseId: string): Promise<boolean> {
        const course = await this.getCourseById(courseId);
        return course.enrolledStudents.includes(studentId);
    }

    async addStudentToCourse(courseId: string, studentId: string) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (course.enrolledStudents.includes(studentId)) {
            throw new ConflictException('Student is already enrolled in this course');
        }

        if (course.enrolledCount >= course.maxCapacity) {
            throw new BadRequestException('Course has reached maximum capacity');
        }

        course.enrolledStudents.push(studentId);
        course.enrolledCount += 1;
        await course.save();

        return course;
    }

    async removeStudentFromCourse(courseId: string, studentId: string) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (!course.enrolledStudents.includes(studentId)) {
            throw new BadRequestException('Student is not enrolled in this course');
        }

        course.enrolledStudents = course.enrolledStudents.filter(id => id !== studentId);
        course.enrolledCount -= 1;
        await course.save();

        return course;
    }
}
