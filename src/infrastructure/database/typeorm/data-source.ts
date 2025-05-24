import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['../../modules/**/*.entity{.ts,.js}'],
  migrations: ['src/infrastructure/database/typerorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
