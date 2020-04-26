import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RequestEntity } from './request.entity';
import { RequestDTO } from './request.dto';
import UniqueID from 'nodejs-snowflake';
import { UserEntity } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/product.entity';

const uid = new UniqueID({
    customEpoch: 1577836800,
    returnNumber: false,
});

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly requestsRepository: Repository<RequestEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) {}

    deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    getDistanceFromLatLonInKm(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
    ): number {
        const R = 6371000;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
                Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    async getRequestsWithinRange(lat: number, lon: number, range: number) {
        const requests = await this.requestsRepository.find();

        return requests.filter(
            request =>
                this.getDistanceFromLatLonInKm(
                    lat,
                    lon,
                    request.lat,
                    request.lon,
                ) <= range,
        );
    }

    async getRequest(id: string) {
        const request = await this.requestsRepository.findOne({
            where: {
                id,
            },
            relations: ['questions', 'author', 'product'],
        });

        if (!request)
            throw new HttpException('Invalid request!', HttpStatus.BAD_REQUEST);

        return {
            ...request,
            author: request.author.toResponseObject(false),
        };
    }

    async create(userId: string, data: RequestDTO) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const request = await this.requestsRepository.create(data);

        if (request.range < 20) {
            throw new HttpException(
                'Range must be bigger than 20 meters!',
                HttpStatus.BAD_REQUEST,
            );
        }

        request.author = user;
        request.id = uid.getUniqueID() as string;
        request.questions = [];
        request.product = await this.productRepository.create({
            ...data.product,
            id: uid.getUniqueID() as string,
        });
        request.expires = new Date(data.expires) || null;

        await this.requestsRepository.save(request);

        return {
            ...request,
            author: user.toResponseObject(false),
        };
    }

    async update(userId: string, id: string, data: Partial<RequestDTO>) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        let request = await this.requestsRepository.findOne({
            where: { id },
            relations: ['questions', 'author', 'product'],
        });

        if (!request)
            throw new HttpException('Invalid request!', HttpStatus.BAD_REQUEST);

        await this.requestsRepository.update(id, data);

        request = await this.requestsRepository.findOne({
            where: { id },
            relations: ['questions', 'author', 'product'],
        });

        request.author = request.author.toResponseObject(false);

        return request;
    }

    async delete(userId: string, id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user)
            throw new HttpException('Invalid user!', HttpStatus.BAD_REQUEST);

        const request = await this.requestsRepository.findOne({
            where: { id },
            relations: ['questions', 'author', 'product'],
        });

        if (!request)
            throw new HttpException('Invalid request!', HttpStatus.BAD_REQUEST);

        if (request.author.id != user.id)
            throw new HttpException(
                "You're not the author of the request!",
                HttpStatus.FORBIDDEN,
            );

        await this.requestsRepository.delete(request.id);

        request.author = user.toResponseObject(false);

        return request;
    }
}
