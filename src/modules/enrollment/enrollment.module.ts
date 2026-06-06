import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { Enrollment, EnrollmentSchema } from '../../common/schemas/enrollment.schema';
import { CourseModule } from '../course/course.module';
import { StudentModule } from '../student/student.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Enrollment.name, schema: EnrollmentSchema }]),
        CourseModule,
        StudentModule,
    ],
    controllers: [EnrollmentController],
    providers: [EnrollmentService],
    exports: [EnrollmentService],
})
export class EnrollmentModule { }
