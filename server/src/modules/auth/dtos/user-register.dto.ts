import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsStrongPassword,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @MinLength(3, {
    message: 'User name should be at least 3 characters',
  })
  @Matches(/^[a-zA-Z]+$/, {
    message: 'User name should contain alphabetic characters only',
  })
  username: string;

  @IsEmail(
    {},
    { message: 'Email is invalid, please enter a valid email address' },
  )
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must have min length of 8 and have at least one lower case character, one upper case character, one number and one special character.',
    },
  )
  @MaxLength(100)
  password: string;
}
