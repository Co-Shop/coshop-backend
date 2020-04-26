import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ShopEntity } from './shop.entity';

@Module({
  providers: [ShopsService],
  controllers: [ShopsController],
  imports: [TypeOrmModule.forFeature([UserEntity, ShopEntity])]
})
export class ShopsModule {}
