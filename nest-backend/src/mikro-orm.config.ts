import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  entities: ['./dist/entities/*.js'],
  entitiesTs: ['./src/entities/*.ts'],
  dbName: 'datatys',
  user: 'root',
  password: 'root',
  host: 'db',
  port: 5432,
  migrations: {
    path: './dist/migrations',
  },
});