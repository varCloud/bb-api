export class Password {
  async hash(password: string): Promise<string>;
  hash(): Promise<string> {
    throw new Error('Method not implemented');
  }

  async compare(password: string, hash: string): Promise<boolean>;
  compare(): Promise<boolean> {
    throw new Error('Method not implemented');
  }
}
