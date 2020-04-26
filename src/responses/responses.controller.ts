import { Controller, Get, Param, UseGuards, UsePipes, ValidationPipe, Post, Body, Delete } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponseDTO } from './response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('responses')
export class ResponsesController {
    constructor(private readonly responsesService: ResponsesService) {}

    @Get(':id')
    async getResponse(@Param('id') id: string) {
        return await this.responsesService.getResponse(id);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':shop_id/new')
    async createResponse(@Param('shop_id') shopId: string, @User('id') userId: string, @Body() data: ResponseDTO) {
        return await this.responsesService.create(userId, shopId, data);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':id/update')
    async updateResponse(
        @User('id') userId: string,
        @Param('id') id: string,
        @Body() data: Partial<ResponseDTO>,
    ) {
        return await this.responsesService.update(userId, id, data);
    }

    @UseGuards(new AuthGuard())
    @Delete(':id')
    async deleteResponse(@User('id') userId: string, @Param('id') id: string) {
        return await this.responsesService.delete(userId, id);
    }
}
