import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { VerificationEntity } from 'src/shared/verification.entity';
import { MailerService } from '@nest-modules/mailer';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(VerificationEntity)
        private verificationRepository: Repository<VerificationEntity>,
        private readonly mailerService: MailerService
    ) {}

    // !DEV-ONLY!
    async allUsers() {
        return (await this.userRepository.find()).map(user =>
            user.toResponseObject(false),
        );
    }

    async getUser(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['requests', 'questions', 'responses', 'products'],
        });

        if (!user) {
            throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }

        console.log(user);

        return user.toResponseObject(false);
    }

    async verifyUser(code: string) {
        const verification: VerificationEntity = await this.verificationRepository.findOne(
            {
                where: {
                    code,
                },
            },
        );

        if (!verification) {
            throw new HttpException('Invalid code!', HttpStatus.BAD_REQUEST);
        }

        if (
            verification.created.getTime() + 12000 * 60 * 60 <
            new Date().getTime()
        ) {
            throw new HttpException('Code expired!', HttpStatus.GONE);
        }

        const user = await this.userRepository.findOne({
            where: {
                id: verification.user,
            },
        });

        if (!user) {
            throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }

        user.verified = true;
        await this.userRepository.update(user.id, user);

        return await (
            await this.userRepository.findOne({
                where: { id: verification.user },
            })
        ).toResponseObject(false);
    }

    async resendVerification(id: string) {

        const verification: VerificationEntity[] = await this.verificationRepository.find(
            {
                where: {
                    user: id,
                },
            },
        );

        verification.forEach(entity => {
            if (
                entity.created.getTime() + 24000 * 60 * 60 >
                new Date().getTime()
            ) {
                throw new HttpException('Only one request per 24 hours allowed', HttpStatus.TOO_MANY_REQUESTS);
            }
        })

        const user = await this.userRepository.findOne({
            where: {
                id
            },
        });

        if (!user) {
            throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }

        if(user.verified) {
            throw new HttpException('User already verified!', HttpStatus.FORBIDDEN);
        }

        const newVerification = this.verificationRepository.create({
            user: user.id,
            code: crypto.randomBytes(64).toString('hex'),
            email: user.email
        });

        this.verificationRepository.save(newVerification);

        this.mailerService.sendMail({
            to: `<${user.username}> ${user.email}`,
            from: `<no-reply> noreply@coshop.org`,
            subject: 'Email verification',
            template: 'confirm',
            context: {
                link: `https://coshop.org/verify?code=${newVerification.code}`
            }
        });

        return await (
            await this.userRepository.findOne({
                where: { id },
            })
        ).toResponseObject(false);

    }

}
