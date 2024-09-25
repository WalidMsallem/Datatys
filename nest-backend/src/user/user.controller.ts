import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @Post('create')
  //   async createProfile(@Body() userData: Partial<User>): Promise<User> {
  //     return this.userService.create(userData);
  //   }

  @Get('profile/:id')
  async getProfile(@Param('id') id: number): Promise<User> {
    return this.userService.getProfile(id);
  }

  @Put('update')
  async updateProfile(
    @Body('id') id: number,
    @Body() updateData: Partial<User>,
  ) {
    const updatedUser = await this.userService.update(id, updateData);
    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  @Post('login')
  async login(
    @Body('emailOrName') emailOrName: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.validateUser(emailOrName, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        city: user.city,
      },
    };
  }
}
