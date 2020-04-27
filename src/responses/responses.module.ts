import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import { ResponseEntity } from './response.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ShopEntity } from 'src/shops/shop.entity';
import { QuestionEntity } from 'src/questions/question.entity';

@Module({
    providers: [ResponsesService],
    controllers: [ResponsesController],
    imports: [TypeOrmModule.forFeature([UserEntity, ShopEntity, ResponseEntity, QuestionEntity])],
})
export class ResponsesModule {}
