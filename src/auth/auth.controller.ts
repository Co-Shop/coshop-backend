import {
    Controller,
    Get,
    UseGuards,
    Post,
    UsePipes,
    ValidationPipe,
    Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';
import { UserDTO } from 'src/users/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('@me')
    @UseGuards(new AuthGuard())
    async getLoggedInUser(@User('id') userId: string) {
        return await this.authService.getCurrentUser(userId);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data: UserDTO) {
        return await this.authService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() data: UserDTO) {
        return await this.authService.register(data);
    }
}
