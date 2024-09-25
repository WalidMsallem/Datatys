import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'The email format is invalid' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
