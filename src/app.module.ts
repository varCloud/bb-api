import { Module } from '@nestjs/common';
import { ConfigurationModule } from './shared/config/config.module';
// import { MysqlModule } from './infrastructure/database/typeorm/typeorm.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [ConfigurationModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
