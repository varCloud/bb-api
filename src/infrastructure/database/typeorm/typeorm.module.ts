import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigurationModule } from 'src/shared/config/config.module';
import { EnvironmentService } from 'src/shared/services/environment.service';

export const getTypeOrmModuleOptions = (
  config: EnvironmentService,
): TypeOrmModuleOptions =>
  ({
    type: process.env.DATABASE_TYPE ?? 'mysql',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: ['../../modules/**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    synchronize: false,
    migrationsRun: true,
    migrations: ['./migrations/*.ts'],
    logging: false,
    autoLoadEntities: true,
  }) as TypeOrmModuleOptions;
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [EnvironmentService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class MysqlModule {}
