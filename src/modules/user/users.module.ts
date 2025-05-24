import { Module } from '@nestjs/common';
import { UserController } from 'src/api/v1/user/controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UsersModule {}
