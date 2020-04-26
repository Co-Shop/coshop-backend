import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { RequestEntity } from 'src/requests/request.entity';
import { QuestionEntity } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [TypeOrmModule.forFeature([UserEntity, RequestEntity, QuestionEntity])]
})
export class QuestionsModule {}
