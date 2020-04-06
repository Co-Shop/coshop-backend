import {
    Controller,
    Post,
    Get,
    Body,
    UsePipes,
    UseGuards,
    Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
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
}
