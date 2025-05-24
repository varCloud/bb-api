import { UserResponseDto } from '../dto/response-user';
import { User } from '../entities/user';
import { UserEntity } from '../infrastructure/database/entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return User.create(
      entity.name,
      entity.lastName,
      entity.email,
      entity.password,
      entity.gender,
      entity.id,
    );
  }

  static toPersistence(domain: User): UserEntity {
    return Object.assign(new UserEntity(), domain);
  }

  static toResponse(domain: User): UserResponseDto {
    return {
      id: domain.id ?? '',
      name: domain.name,
      email: domain.email,
      lastName: domain.lastName,
      gender: domain.gender,
    };
  }

  static toResponseArray(users: User[]): UserResponseDto[] {
    return users.map((user) => this.toResponse(user));
  }
}
