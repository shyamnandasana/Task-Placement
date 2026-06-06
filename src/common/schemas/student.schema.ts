import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
    @Prop({ required: true, unique: true })
    studentId: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    dateOfBirth: Date;

    @Prop()
    department: string;

    @Prop({ type: [String], default: [] })
    enrolledCourses: string[];

    @Prop({ default: true })
    isActive: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
