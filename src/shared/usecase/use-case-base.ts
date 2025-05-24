abstract class UseCaseBase {
  abstract execute(...args: unknown[]): Promise<unknown>;
}

export default UseCaseBase;
