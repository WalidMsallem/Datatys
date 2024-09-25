import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  //   async create(userData: Partial<User>): Promise<User> {
  //     const user = this.em.create(User, userData);
  //     await this.em.persistAndFlush(user);
  //     return user;
  //   }

  async getProfile(id: number): Promise<User> {
    return await this.em.findOne(User, { id });
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
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

  async validateUser(
    emailOrName: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.findByEmailOrName(emailOrName);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  //   @Injectable()
  // export class UserService {
  //   async updateProfilePicture(fileName: string): Promise<any> {
  //     // Save the filename in the database
  //     // Assuming you have a user ID, this could be part of the logged-in user's profile update
  //     const userId = '123';  // Replace with dynamic user ID
  //     // Example: Update the user’s profile picture in the database
  //     // await this.userRepository.update(userId, { profilePicture: fileName });

  //     return { message: 'Profile picture updated successfully', fileName };
  //   }
  // }

  async updateProfilePicture(userId: number, fileName: string): Promise<any> {
    // Save the filename in the database for the corresponding user
    // Example:
    const user = await this.em.findOneOrFail(User, { id: userId });
    this.em.assign(user, { profilePicture: fileName });
    await this.em.persistAndFlush(user);
    // await this.userRepository.update(userId, { profilePicture: fileName });
    return { message: 'Profile picture updated successfully', fileName };
  }
}
