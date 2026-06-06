import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class CreateCourseDto {
    @ApiProperty({ example: 'CS101' })
    @IsNotEmpty()
    @IsString()
    courseCode: string;

    @ApiProperty({ example: 'Introduction to Computer Science' })
    @IsNotEmpty()
    @IsString()
    courseName: string;

    @ApiProperty({ example: 'Learn fundamentals of programming' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: 3 })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    credits: number;

    @ApiProperty({ example: 30 })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    maxCapacity: number;

    @ApiProperty({ example: 'Dr. Smith' })
    @IsNotEmpty()
    @IsString()
    instructor: string;
}

export class CourseResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    courseCode: string;

    @ApiProperty()
    courseName: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    credits: number;

    @ApiProperty()
    maxCapacity: number;

    @ApiProperty()
    enrolledCount: number;

    @ApiProperty()
    instructor: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;
}
