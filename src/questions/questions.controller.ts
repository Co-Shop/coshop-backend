import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe, Post, Body, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';
import { QuestionDTO } from './question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Get(':id')
    async getQuestion(@Param('id') id: string) {
        return await this.questionsService.getQuestion(id);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':request_id/new')
    async createQuestion(
        @Param('request_id') requestId: string,
        @User('id') userId: string,
        @Body() data: QuestionDTO,
    ) {
        return await this.questionsService.create(userId, requestId, data);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':id/update')
    async updateQuestion(
        @User('id') userId: string,
        @Param('id') id: string,
        @Body() data: Partial<QuestionDTO>,
    ) {
        return await this.questionsService.update(userId, id, data);
    }

    @UseGuards(new AuthGuard())
    @Delete(':id')
    async deleteQuestion(@User('id') userId: string, @Param('id') id: string) {
        return await this.questionsService.delete(userId, id);
    }
}
