import { Controller, Get, Param, Body, UseGuards, UsePipes, ValidationPipe, Post, Delete } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';
import { ShopDTO } from './shop.dto';

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) {}

    @Get(':id')
    async getShop(@Param('id') id: string) {
        return await this.shopsService.getShop(id);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post('new')
    async createShop(@User('id') userId: string, @Body() data: ShopDTO) {
        return await this.shopsService.create(userId, data);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':id/update')
    async updateShop(
        @User('id') userId: string,
        @Param('id') id: string,
        @Body() data: Partial<ShopDTO>,
    ) {
        return await this.shopsService.update(userId, id, data);
    }
}
