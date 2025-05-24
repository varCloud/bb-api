import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/api/v1/user/controllers/user.controller';
import { UserEntity } from './infrastructure/database/entities/user.entity';
import { UserRepositoryMysql } from './repositories/user.repository.mysql';
import UseCaseKeysModel from 'src/shared/usecase/use-case-keys';
import UseCaseProxy from 'src/shared/usecase/use-case-proxy';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { CreateUserUseCase } from './use-cases/create-user-use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      inject: [UserRepositoryMysql],
      provide: UseCaseKeysModel.GET_USERS,
      useFactory: (userRepository: UserRepositoryMysql) =>
        new UseCaseProxy(new FindAllUsersUseCase(userRepository)),
    },
    {
      inject: [UserRepositoryMysql],
      provide: UseCaseKeysModel.CREATE_USER,
      useFactory: (userRepository: UserRepositoryMysql) =>
        new UseCaseProxy(new CreateUserUseCase(userRepository)),
    },
    UserRepositoryMysql,
  ],
})
export class UsersModule {}
