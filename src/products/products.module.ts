import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ShopEntity } from 'src/shops/shop.entity';

@Module({
    providers: [ProductsService],
    controllers: [ProductsController],
    imports: [TypeOrmModule.forFeature([UserEntity, ShopEntity, ProductEntity])],
})
export class ProductsModule {}
