import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import UniqueID from 'nodejs-snowflake';
import { QuestionEntity } from './question.entity';
import { QuestionDTO } from './question.dto';
import { RequestEntity } from 'src/requests/request.entity';

const uid = new UniqueID({
    customEpoch: 1577836800,
    returnNumber: false,
});

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
        @InjectRepository(RequestEntity)
        private readonly requestRepository: Repository<RequestEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getQuestion(id: string) {
        const question = await this.questionRepository.findOne({
            where: {
                id,
            },
            relations: ['request', 'author', 'answers'],
        });

        if (!question)
            throw new HttpException(
                'Invalid question!',
                HttpStatus.BAD_REQUEST,
            );

        return {
            ...question,
            author: question.author.toResponseObject(false),
        };
    }

    async create(userId: string, requestId: string, data: QuestionDTO) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const request = await this.requestRepository.findOne({
            where: {
                id: requestId,
            },
        });

        if (!request)
            throw new HttpException('Invalid request!', HttpStatus.BAD_REQUEST);

        const question = await this.questionRepository.create(data);

        question.author = user;
        question.id = uid.getUniqueID() as string;
        question.request = request;
        question.answers = [];

        await this.questionRepository.save(question);

        return await {
            ...this.questionRepository.findOne({
                where: { id: question.id },
                relations: ['request', 'author', 'answers'],
            }),
            author: user.toResponseObject(false),
        };
    }

    async update(userId: string, id: string, data: Partial<QuestionDTO>) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        let question = await this.questionRepository.findOne({
            where: { id },
            relations: ['request', 'author', 'answers'],
        });

        if (!question)
            throw new HttpException(
                'Invalid question!',
                HttpStatus.BAD_REQUEST,
            );

        await this.questionRepository.update(id, data);

        question = await this.questionRepository.findOne({
            where: { id },
            relations: ['request', 'author', 'answers'],
        });

        question.author = question.author.toResponseObject(false);

        return question;
    }

    async delete(userId: string, id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const question = await this.questionRepository.findOne({
            where: { id },
            relations: ['request', 'author', 'answers'],
        });

        if (!question)
            throw new HttpException(
                'Invalid question!',
                HttpStatus.BAD_REQUEST,
            );

        if (question.author.id != user.id)
            throw new HttpException(
                "You're not the author of the question!",
                HttpStatus.FORBIDDEN,
            );

        await this.questionRepository.delete(question.id);

        return question;
    }
}
