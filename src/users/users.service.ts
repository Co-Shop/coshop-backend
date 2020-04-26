import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
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
}
