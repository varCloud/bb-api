class CreateUserInput {
  constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly gender: string,
  ) {}
}

export { CreateUserInput };
