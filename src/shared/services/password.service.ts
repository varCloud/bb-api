import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Password } from '../adapters/password.adapter';

@Injectable()
class PasswordService extends Password {
  salt = 10;

  override async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash;
  }

  override async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }
}

export default PasswordService;
