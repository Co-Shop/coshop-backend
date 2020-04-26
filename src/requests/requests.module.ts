import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { UserEntity } from 'src/users/user.entity';
import { ProductEntity } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, RequestEntity, UserEntity])],
  providers: [RequestsService],
  controllers: [RequestsController]
})
export class RequestsModule {}
