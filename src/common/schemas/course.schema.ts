import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
    @Prop({ required: true, unique: true })
    courseCode: string;

    @Prop({ required: true })
    courseName: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    credits: number;

    @Prop({ required: true })
    maxCapacity: number;

    @Prop({ default: 0 })
    enrolledCount: number;

    @Prop({ required: true })
    instructor: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [String], default: [] })
    enrolledStudents: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
