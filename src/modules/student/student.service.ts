import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../../common/schemas/student.schema';
import { RegisterStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
    ) { }

    async registerStudent(registerStudentDto: RegisterStudentDto) {
        const existingStudent = await this.studentModel.findOne({
            $or: [
                { email: registerStudentDto.email },
                { studentId: registerStudentDto.studentId },
            ],
        });

        if (existingStudent) {
            throw new ConflictException('Student with this email or ID already exists');
        }

        const student = await this.studentModel.create(registerStudentDto);
        return student;
    }

    async getStudentById(id: string) {
        const student = await this.studentModel.findById(id);
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        return student;
    }

    async getStudentByEmail(email: string) {
        const student = await this.studentModel.findOne({ email });
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        return student;
    }

    async getAllStudents() {
        const students = await this.studentModel.find({ isActive: true });
        return students;
    }

    async addCoursesToStudent(studentId: string, courseId: string) {
        const student = await this.studentModel.findById(studentId);
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        if (!student.enrolledCourses.includes(courseId)) {
            student.enrolledCourses.push(courseId);
            await student.save();
        }

        return student;
    }

    async removeCoursFromStudent(studentId: string, courseId: string) {
        const student = await this.studentModel.findById(studentId);
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        student.enrolledCourses = student.enrolledCourses.filter(id => id !== courseId);
        await student.save();

        return student;
    }

    async getStudentEnrolledCourses(studentId: string) {
        const student = await this.getStudentById(studentId);
        return student.enrolledCourses;
    }
}
