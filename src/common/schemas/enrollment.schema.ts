import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Enrollment extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
    studentId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
    courseId: Types.ObjectId;

    @Prop({ default: 'active' })
    status: string;

    @Prop()
    enrollmentDate: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);

EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
