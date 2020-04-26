import {
    Controller,
    Get,
    Param,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Post,
    Body,
    Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return await this.productsService.getProduct(id);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':shop_id/new')
    async createProduct(
        @Param('shop_id') shopId: string,
        @User('id') userId: string,
        @Body() data: ProductDTO,
    ) {
        return await this.productsService.create(userId, shopId, data);
    }

    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    @Post(':id/update')
    async updateProduct(
        @User('id') userId: string,
        @Param('id') id: string,
        @Body() data: Partial<ProductDTO>,
    ) {
        return await this.productsService.update(userId, id, data);
    }

    @UseGuards(new AuthGuard())
    @Delete(':id')
    async deleteProduct(@User('id') userId: string, @Param('id') id: string) {
        return await this.productsService.delete(userId, id);
    }
}
