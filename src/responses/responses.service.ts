import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ResponseEntity } from './response.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ResponseDTO } from './response.dto';
import UniqueID from 'nodejs-snowflake';
import { ShopEntity } from 'src/shops/shop.entity';

const uid = new UniqueID({
    customEpoch: 1577836800,
    returnNumber: false,
});

@Injectable()
export class ResponsesService {
    constructor(
        @InjectRepository(ResponseEntity)
        private readonly responseRepository: Repository<ResponseEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
    ) {}

    async getResponse(id: string) {
        const response = await this.responseRepository.findOne({
            where: {
                id,
            },
            relations: ['shop', 'author'],
        });

        if (!response)
            throw new HttpException('Invalid response!', HttpStatus.BAD_REQUEST);

        return {
            ...response,
            author: response.author.toResponseObject(false),
        };
    }

    async create(userId: string, shopId: string, data: ResponseDTO) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const shop = await this.shopRepository.findOne({
            where: {
                id: shopId
            }
        })

        if (!shop)
            throw new HttpException('Invalid shop!', HttpStatus.BAD_REQUEST);

        const response = await this.responseRepository.create(data);

        response.author = user;
        response.id = uid.getUniqueID() as string;
        response.shop = shop;

        await this.responseRepository.save(response);

        return await {
            ...this.responseRepository.findOne({
                where: { id: response.id },
                relations: ['shop', 'author'],
            }),
            author: user.toResponseObject(false),
        };
    }

    async update(userId: string, id: string, data: Partial<ResponseDTO>) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        let response = await this.responseRepository.findOne({
            where: { id },
            relations: ['shop', 'author'],
        });

        if (!response)
            throw new HttpException(
                'Invalid response!',
                HttpStatus.BAD_REQUEST,
            );

        await this.responseRepository.update(id, data);

        response = await this.responseRepository.findOne({
            where: { id },
            relations: ['shop', 'author'],
        });

        response.author = response.author.toResponseObject(false);

        return response;
    }

    async delete(userId: string, id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const response = await this.responseRepository.findOne({
            where: { id },
            relations: ['shop', 'author'],
        });

        if (!response)
            throw new HttpException(
                'Invalid response!',
                HttpStatus.BAD_REQUEST,
            );

        if (response.author.id != user.id)
            throw new HttpException(
                "You're not the author of the response!",
                HttpStatus.FORBIDDEN,
            );

        await this.responseRepository.delete(response.id);

        return response;
    }
}
