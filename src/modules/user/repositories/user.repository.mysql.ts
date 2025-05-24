import { Repository } from 'typeorm';
import { UserEntity } from '../infrastructure/database/entities/user.entity';
import { UserRepository } from './user.repository';
import { User } from '../entities/user';
import { UserMapper } from '../mappers/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepositoryMysql implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    await this.userRepository.save(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((userEntity) => UserMapper.toDto(userEntity));
  }
}
