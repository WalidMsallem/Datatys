import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: 'test-db',
      type: 'postgresql',  
      user: 'root', 
      password: 'root',
      entities: ['./dist/entities'], 
      entitiesTs: ['./src/entities'],
    }),
    UserModule,
  ],
})
export class AppModule {}