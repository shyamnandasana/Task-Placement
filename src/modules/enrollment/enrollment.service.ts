import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from '../../common/schemas/enrollment.schema';
import { EnrollStudentDto } from './dto/enrollment.dto';
import { CourseService } from '../course/course.service';
import { StudentService } from '../student/student.service';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
        private courseService: CourseService,
        private studentService: StudentService,
    ) { }

    async enrollStudent(enrollStudentDto: EnrollStudentDto) {
        const { studentId, courseId } = enrollStudentDto;

        const student = await this.studentService.getStudentById(studentId);
        const course = await this.courseService.getCourseById(courseId);

        if (!student || !course) {
            throw new NotFoundException('Student or Course not found');
        }

        const isDuplicate = await this.enrollmentModel.findOne({
            studentId,
            courseId,
            status: 'active',
        });

        if (isDuplicate) {
            throw new ConflictException('Student is already enrolled in this course');
        }

        const hasCapacity = await this.courseService.checkEnrollmentCapacity(courseId);
        if (!hasCapacity) {
            throw new BadRequestException('Course has reached maximum capacity');
        }

        const enrollment = await this.enrollmentModel.create({
            studentId,
            courseId,
            status: 'active',
            enrollmentDate: new Date(),
        });

        await this.courseService.addStudentToCourse(courseId, studentId);
        await this.studentService.addCoursesToStudent(studentId, courseId);

        return enrollment;
    }

    async getEnrollmentById(id: string) {
        const enrollment = await this.enrollmentModel.findById(id).populate(['studentId', 'courseId']);
        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }
        return enrollment;
    }

    async getStudentEnrollments(studentId: string) {
        const enrollments = await this.enrollmentModel
            .find({ studentId, status: 'active' })
            .populate('courseId');
        return enrollments;
    }

    async getCourseEnrollments(courseId: string) {
        const enrollments = await this.enrollmentModel
            .find({ courseId, status: 'active' })
            .populate('studentId');
        return enrollments;
    }

    async unenrollStudent(enrollmentId: string) {
        const enrollment = await this.enrollmentModel.findById(enrollmentId);
        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }

        await this.courseService.removeStudentFromCourse(
            enrollment.courseId.toString(),
            enrollment.studentId.toString(),
        );
        await this.studentService.removeCoursFromStudent(
            enrollment.studentId.toString(),
            enrollment.courseId.toString(),
        );

        enrollment.status = 'unenrolled';
        await enrollment.save();

        return enrollment;
    }

    async getAllEnrollments() {
        return this.enrollmentModel.find({ status: 'active' }).populate(['studentId', 'courseId']);
    }
}
