import UseCaseBase from 'src/shared/usecase/use-case-base';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user';
import { CreateUserInput } from '../dto/create-user-input';
import { UserMapper } from '../mappers/user.mapper';
import { UserResponseDto } from '../dto/response-user';

export class CreateUserUseCase extends UseCaseBase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(input: CreateUserInput): Promise<UserResponseDto> {
    const user = User.create(
      input.name,
      input.lastName,
      input.email,
      input.password,
      input.gender,
    );

    const newUser = await this.userRepository.create(user);

    return UserMapper.toResponse(newUser);
  }
}
