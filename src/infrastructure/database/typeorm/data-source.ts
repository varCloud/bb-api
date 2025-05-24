import 'reflect-metadata';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

ConfigModule.forRoot().catch((err) =>
  console.error('error loading config', err),
);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: ['../../modules/**/*.entity{.ts,.js}'],
  migrations: ['src/infrastructure/database/typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
