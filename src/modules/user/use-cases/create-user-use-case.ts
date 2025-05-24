import UseCaseBase from 'src/shared/usecase/use-case-base';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user';

export class CreateUserUseCase extends UseCaseBase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(user: User): Promise<User> {
    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
