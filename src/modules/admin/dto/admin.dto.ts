import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
    @ApiProperty({ example: 'admin@college.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}

export class AdminRegisterDto extends AdminLoginDto {
    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class AdminResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;
}
