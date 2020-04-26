import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

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
