import { User } from '../entities/user';

export interface UserRepository {
  findAll(): Promise<User[]>;
  create(user: User): Promise<User>;
}
