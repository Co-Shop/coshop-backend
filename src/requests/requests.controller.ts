import {
    Controller,
    Get,
    Post,
    Delete,
    UseGuards,
    Param,
    Body,
    UsePipes,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestsService } from './requests.service';
import { RequestDTO } from './request.dto';
import { ValidationPipe } from './../shared/validation.pipe';
import { User } from 'src/users/user.decorator';

@Controller('requests')
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) {}

    @Get(':id')
    async getRequest(@Param('id') id: string) {
        return await this.requestsService.getRequest(id);
    }

    @Get('range/:range')
    async getRequestsWithinRange(
        @Param('range') range: number,
        @Body('lat') lat: number,
        @Body('lon') lon: number,
    ) {
        return await this.requestsService.getRequestsWithinRange(
            lat,
            lon,
            range,
        );
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post('new')
    async createRequest(@User('id') userId: string, @Body() data: RequestDTO) {
        return await this.requestsService.create(userId, data);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':id/update')
    async updateRequest(
        @User('id') userId: string,
        @Param('id') id: string,
        @Body() data: Partial<RequestDTO>,
    ) {
        return await this.requestsService.update(userId, id, data);
    }

    @UseGuards(new AuthGuard())
    @Delete(':id')
    async deleteRequest(@User('id') userId: string, @Param('id') id: string) {
        return await this.requestsService.delete(userId, id);
    }
}
