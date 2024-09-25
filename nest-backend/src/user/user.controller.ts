import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

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

  @Post(':userId/upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures', // Directory to save the uploaded file
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname); // Get the file extension
          const fileName = `${Date.now()}${fileExtName}`; // Create a unique filename
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadProfilePicture(
    @Param('userId') userId: number, // Accept user ID as URL parameter
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Call the service to update the user's profile picture
    return this.userService.updateProfilePicture(userId, file.filename);
  }
}
