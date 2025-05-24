import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserValidation {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
