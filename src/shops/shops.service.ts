import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShopEntity } from './shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ShopDTO } from './shop.dto';
import UniqueID from 'nodejs-snowflake';

const uid = new UniqueID({
    customEpoch: 1577836800,
    returnNumber: false,
});

@Injectable()
export class ShopsService {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getShop(id: string) {
        const shop = await this.shopRepository.findOne({
            where: {
                id,
            },
            relations: ['responses', 'products'],
        });

        if (!shop)
            throw new HttpException('Invalid shop!', HttpStatus.BAD_REQUEST);

        return shop;
    }

    async create(userId: string, data: ShopDTO) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const shop = await this.shopRepository.create(data);

        shop.id = uid.getUniqueID() as string;

        await this.shopRepository.save(shop);

        return await this.shopRepository.findOne({
            where: { id: shop.id },
            relations: ['responses', 'products'],
        });
    }

    async update(userId: string, id: string, data: Partial<ShopDTO>) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const shop = await this.shopRepository.findOne({
            where: { id },
            relations: ['responses', 'products'],
        });

        if (!shop)
            throw new HttpException('Invalid shop!', HttpStatus.BAD_REQUEST);

        await this.shopRepository.update(id, data);

        return await this.shopRepository.findOne({
            where: { id },
            relations: ['responses', 'products'],
        });
    }
}
