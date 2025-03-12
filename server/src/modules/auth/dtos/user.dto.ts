import { User } from '../schema/user.schema';

export class UserDto {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  token: string;

  constructor(user: User, token: string | null = null) {
    this.id = user.id;
    this.username = user.name;
    this.email = user.email;

    if (token) this.token = token;
  }
}
