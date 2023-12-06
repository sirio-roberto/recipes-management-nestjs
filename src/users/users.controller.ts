import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard('basic'))
  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }
}
