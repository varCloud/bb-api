import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user';
import { UserMapper } from '../../mappers/user.mapper';

export class UserRepositoryMysql implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = UserMapper.toPersistence(user);
    const newUser = await this.userRepository.save(entity);

    return UserMapper.toDomain(newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((userEntity) => UserMapper.toDomain(userEntity));
  }
}
