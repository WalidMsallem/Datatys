import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';

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
  @Index({ name: '_index_users_email' })
  email!: string;

  @Property()
  phoneNumber!: string;

  @Property({ nullable: true })
  profilePicture?: string;

  @Property()
  password!: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({
    onUpdate: () => new Date(),
    onCreate: () => new Date(),
  })
  updatedAt!: Date;
}
