import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from 'src/users/user.dto';
import UniqueID from 'nodejs-snowflake';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AuthDTO } from 'src/auth/auth.dto';
import { VerificationEntity } from 'src/shared/verification.entity';
import { MailerService } from '@nest-modules/mailer';
import * as crypto from 'crypto';

const uid = new UniqueID({
    customEpoch: 1577836800,
    returnNumber: false,
});

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(VerificationEntity)
        private verificationRepository: Repository<VerificationEntity>,
        private readonly mailerService: MailerService
    ) {}

    async login(data: AuthDTO) {
        const { email, password } = data;

        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (!user || !(await user.validatePassword(password))) {
            throw new HttpException(
                'Invalid email/password',
                HttpStatus.FORBIDDEN,
            );
        }

        return user.toResponseObject();
    }

    async register(data: UserDTO) {
        const { username, password, email } = data;

        let user = await this.userRepository.findOne({
            where: {
                username,
            },
        });

        if (user) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        user = this.userRepository.create(data);
        user.id = uid.getUniqueID() as string;
        user.password = password;
        user.email = email;
        user.emailHidden = true;
        user.verified = false;
        user.requests = [];
        user.questions = [];
        await this.userRepository.save(user);

        const verification = this.verificationRepository.create({
            user: user.id,
            code: crypto.randomBytes(64).toString('hex'),
            email: email
        });

        this.verificationRepository.save(verification);

        this.mailerService.sendMail({
            to: `<${user.username}> ${user.email}`,
            from: `<no-reply> noreply@coshop.org`,
            subject: 'Email verification',
            template: 'confirm',
            context: {
                link: `https://coshop.org/verify?code=${verification.code}`
            }
        });

        return user.toResponseObject();
    }

    async getCurrentUser(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }

        return user.toResponseObject(true);
    }
}
