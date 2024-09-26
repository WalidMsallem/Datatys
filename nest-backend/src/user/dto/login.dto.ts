import { IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'The email / Name format is invalid' })
  emailOrName: string;

  @IsString({ message: 'Password is required' })
  password: string;
}
