import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  lastName!: string;

  @Property()
  country!: string;

  @Property()
  city!: string;

  @Property()
  email!: string;

  @Property()
  phoneNumber!: string;

  @Property({ nullable: true })
  profilePicture?: string;
}
