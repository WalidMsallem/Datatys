import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../entities/user.entity';

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

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.em.findOneOrFail(User, { id });
    this.em.assign(user, userData);
    await this.em.persistAndFlush(user);
    return user;
  }
}
