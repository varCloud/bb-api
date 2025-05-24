import UseCaseBase from 'src/shared/usecase/use-case-base';
import { UserRepository } from '../repositories/user.repository';

export class FindAllUsersUseCase extends UseCaseBase {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async execute(): Promise<any[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
