import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.em.create(User, userData);
    await this.em.persistAndFlush(user);
    return user;
  }

  async getProfile(id: number): Promise<User> {
    return await this.em.findOne(User, { id });
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.em.findOneOrFail(User, { id });
    this.em.assign(user, userData);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findByEmailOrName(emailOrName: string): Promise<User | null> {
    return this.em.findOne(User, {
      $or: [{ email: emailOrName }, { name: emailOrName }],
    });
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const { emailOrName, password } = loginDto;
    const user = await this.findByEmailOrName(emailOrName);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async updateProfilePicture(userId: number, fileName: string): Promise<any> {
    if (!fileName) {
      throw new BadRequestException('Please upload a valid picture file');
    }

    const user = await this.em.findOneOrFail(User, { id: userId });
    this.em.assign(user, { profilePicture: fileName });
    await this.em.persistAndFlush(user);

    return { message: 'Profile picture updated successfully', fileName };
  }
}
