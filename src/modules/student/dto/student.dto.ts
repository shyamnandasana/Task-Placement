import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsDateString, IsOptional } from 'class-validator';

export class RegisterStudentDto {
    @ApiProperty({ example: 'STU001' })
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ example: 'john@university.edu' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '+1234567890' })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({ example: '2005-01-15' })
    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: Date;

    @ApiProperty({ example: 'Computer Science', required: false })
    @IsOptional()
    @IsString()
    department: string;
}

export class StudentResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    studentId: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    dateOfBirth: Date;

    @ApiProperty()
    department: string;

    @ApiProperty()
    enrolledCourses: string[];

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;
}
