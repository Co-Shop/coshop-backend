import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './user.decorator';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    // !DEBUG ONLY!
    @Get()
    async allUsers() {
        return await this.userService.allUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return await this.userService.getUser(id);
    }

    @Post('verify')
    async verifyUser(@Query('code') code: string) {
        return await this.userService.verifyUser(code);
    }

    @Post('resend')
    @UseGuards(new AuthGuard())
    async resendVerification(@User('id') id: string) {
        return await this.userService.resendVerification(id);
    }
}
