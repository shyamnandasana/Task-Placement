import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from '../../common/schemas/admin.schema';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
            signOptions: { expiresIn: '24h' },
        }),
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    ],
    controllers: [AdminController],
    providers: [AdminService, JwtStrategy],
    exports: [JwtModule, PassportModule],
})
export class AdminModule { }
