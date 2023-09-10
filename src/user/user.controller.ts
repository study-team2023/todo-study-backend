import { Post, Body, Get, Param, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    return user;
  }

  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: User) {
    return this.userService.updateUser(email, user);
  }
}
