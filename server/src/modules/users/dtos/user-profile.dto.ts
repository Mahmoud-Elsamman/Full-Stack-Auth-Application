import { User } from '../../auth/schema/user.schema';

export class UserProfileDto {
  readonly id: number;
  readonly username: string;
  readonly email: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.name;
    this.email = user.email;
  }
}
