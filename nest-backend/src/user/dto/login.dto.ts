import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'The email / Name format is invalid' })
  emailOrName: string;

  @IsString({ message: 'Password is required' })
  password: string;
}
