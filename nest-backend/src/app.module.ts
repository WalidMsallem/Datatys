import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName : "datatys",
      driver: PostgreSqlDriver,  
      host: 'db',
      user: 'root', 
      password: 'root',
      entities: ['./dist/entities'], 
      entitiesTs: ['./src/entities'],
    }),
    UserModule,
  ],
})
export class AppModule {}