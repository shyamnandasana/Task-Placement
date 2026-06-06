import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class EnrollStudentDto {
    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    @IsNotEmpty()
    @IsMongoId()
    studentId: string;

    @ApiProperty({ example: '507f1f77bcf86cd799439012' })
    @IsNotEmpty()
    @IsMongoId()
    courseId: string;
}

export class EnrollmentResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    studentId: string;

    @ApiProperty()
    courseId: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    enrollmentDate: Date;

    @ApiProperty()
    createdAt: Date;
}
