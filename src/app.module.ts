import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { CourseModule } from './modules/course/course.module';
import { StudentModule } from './modules/student/student.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/college-enrollment',
    ),
    AdminModule,
    CourseModule,
    StudentModule,
    EnrollmentModule,
  ],
})
export class AppModule { }
