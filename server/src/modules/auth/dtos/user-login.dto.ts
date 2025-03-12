import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail(
    {},
    { message: 'Email is invalid, please enter a valid email address' },
  )
  @IsOptional()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
