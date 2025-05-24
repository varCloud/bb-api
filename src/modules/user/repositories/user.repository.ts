import { User } from '../entities/user';

export interface UserRepository {
  findAll(): Promise<User[]>;
}
