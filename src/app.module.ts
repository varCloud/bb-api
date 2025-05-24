import { Module } from '@nestjs/common';
import { ConfigurationModule } from './shared/config/config.module';
import { MysqlModule } from './infrastructure/database/typeorm/typeorm.module';

@Module({
  imports: [ConfigurationModule, MysqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
