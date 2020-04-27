import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import UniqueID from 'nodejs-snowflake';
import { ProductEntity } from './product.entity';
import { ProductDTO } from './product.dto';
import { ShopEntity } from 'src/shops/shop.entity';

const uid = new UniqueID({
    customEpoch: 1577836800,
    returnNumber: false,
});

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getProduct(id: string) {
        const product = await this.productRepository.findOne({
            where: {
                id,
            },
            relations: ['shops', 'author'],
        });

        if (!product)
            throw new HttpException('Invalid product!', HttpStatus.BAD_REQUEST);

        product.author = product.author.toResponseObject(false);

        return product;
    }

    async create(userId: string, shopId: string, data: ProductDTO) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const shop = await this.shopRepository.findOne({
            where: {
                id: shopId,
            },
        });

        if (!shop)
            throw new HttpException('Invalid shop!', HttpStatus.BAD_REQUEST);

        const product = await this.productRepository.create(data);

        product.author = user;
        product.id = uid.getUniqueID() as string;
        product.shops = [shop];
        product.requests = [];

        await this.productRepository.save(product);

        return await {
            ...await this.productRepository.findOne({
                where: { id: product.id },
                relations: ['shops', 'author'],
            }),
            author: user.toResponseObject(false),
        };
    }

    async update(userId: string, id: string, data: Partial<ProductDTO>) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['shops', 'author'],
        });

        if (!product)
            throw new HttpException('Invalid product!', HttpStatus.BAD_REQUEST);

        await this.productRepository.update(id, data);

        return await {
            ...await this.productRepository.findOne({
                where: { id: product.id },
                relations: ['shops', 'author'],
            }),
            author: user.toResponseObject(false),
        };
    }

    async delete(userId: string, id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['shops', 'author'],
        });

        if (!product)
            throw new HttpException('Invalid product!', HttpStatus.BAD_REQUEST);

        if (product.author.id != user.id)
            throw new HttpException(
                "You're not the author of the product!",
                HttpStatus.FORBIDDEN,
            );

        await this.productRepository.delete(product.id);

        return await {
            ...product,
            author: user.toResponseObject(false),
        };
    }
}
