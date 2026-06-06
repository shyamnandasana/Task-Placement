import { Controller, Post, Get, Body, UseGuards, Param, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminLoginDto, AdminRegisterDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Admin')
@Controller('api/admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new admin' })
    async register(@Body(ValidationPipe) adminRegisterDto: AdminRegisterDto) {
        return this.adminService.register(adminRegisterDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Admin login' })
    async login(@Body(ValidationPipe) adminLoginDto: AdminLoginDto) {
        return this.adminService.login(adminLoginDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all admins (requires authentication)' })
    async getAllAdmins() {
        return this.adminService.getAllAdmins();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get admin by ID (requires authentication)' })
    async getAdminById(@Param('id') id: string) {
        return this.adminService.getAdminById(id);
    }
}
