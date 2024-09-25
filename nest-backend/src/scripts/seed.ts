import { MikroORM } from '@mikro-orm/core';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import config from '../mikro-orm.config';

const seed = async () => {
  console.log('Seed starting!')
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();
 
  const password= await bcrypt.hash('simple-password', 10);
  const user1 = em.create(User, {
    name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      country: faker.location.country()  ,
      city: faker.location.city()  ,
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password,
  });

  const user2 = em.create(User, {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    country: faker.location.country()  ,
    city: faker.location.city()  ,
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    password,
  });

  await em.persistAndFlush([user1, user2]);
  
  console.log('Seeding complete!');
  await orm.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
