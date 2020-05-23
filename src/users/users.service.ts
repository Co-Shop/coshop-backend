import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { VerificationEntity } from 'src/shared/verification.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(VerificationEntity)
        private verificationRepository: Repository<VerificationEntity>,
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
        Logger.log('sss');
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
            verification.created.getTime() + 15000 * 60 <
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
        return 'yes';
    }
}
