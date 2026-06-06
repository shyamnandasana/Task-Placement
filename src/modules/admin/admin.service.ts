import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../../common/schemas/admin.schema';
import { AdminLoginDto, AdminRegisterDto } from './dto/admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
        private jwtService: JwtService,
    ) { }

    async register(adminRegisterDto: AdminRegisterDto) {
        const existingAdmin = await this.adminModel.findOne({ email: adminRegisterDto.email });
        if (existingAdmin) {
            throw new ConflictException('Admin already exists with this email');
        }

        const admin = await this.adminModel.create(adminRegisterDto);
        return this.formatAdminResponse(admin);
    }

    async login(adminLoginDto: AdminLoginDto) {
        const admin = await this.adminModel.findOne({ email: adminLoginDto.email });
        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await admin.comparePassword!(adminLoginDto.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({
            id: admin._id,
            email: admin.email,
            role: 'admin',
        });

        return {
            access_token: token,
            admin: this.formatAdminResponse(admin),
        };
    }

    async getAdminById(id: string) {
        const admin = await this.adminModel.findById(id);
        if (!admin) {
            throw new NotFoundException('Admin not found');
        }
        return this.formatAdminResponse(admin);
    }

    async getAllAdmins() {
        const admins = await this.adminModel.find();
        return admins.map(admin => this.formatAdminResponse(admin));
    }

    private formatAdminResponse(admin: AdminDocument) {
        const adminObj = admin.toObject();
        const { password, ...response } = adminObj;
        return response;
    }
}
