import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from 'src/users/user.dto';
import UniqueID from 'nodejs-snowflake';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';

const uid = new UniqueID({
    customEpoch: 1577836800,
    returnNumber: false,
});

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async login(data: UserDTO) {
        const { username, password } = data;

        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });

        if (!user || !(await user.validatePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
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
        user.requests = [];
        user.questions = [];
        await this.userRepository.save(user);

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
