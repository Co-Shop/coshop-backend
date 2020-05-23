import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { VerificationEntity } from 'src/shared/verification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, VerificationEntity])],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
