export class User {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly gender: string,
    public readonly id?: string,
  ) {}

  static create(
    name: string,
    lastName: string,
    email: string,
    password: string,
    gender: string,
    id?: string,
  ): User {
    return new User(name, email, lastName, password, gender, id);
  }
}
