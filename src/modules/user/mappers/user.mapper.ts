import { User } from '../entities/user';
import { UserEntity } from '../infrastructure/database/entities/user.entity';

export class UserMapper {
  static toDto(entity: UserEntity): User {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      lastName: entity.lastName,
    };
  }
}
