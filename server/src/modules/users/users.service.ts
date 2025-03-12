import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schema/user.schema';
import { UserProfileDto } from './dtos/user-profile.dto';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly logger: AppLogger,
  ) {}

  async getProfile(userId: string) {
    this.logger.log('user requested profile');

    const user = await this.userModel.findById(userId).select('-password');

    if (!user) throw new NotFoundException('User not found');

    return new UserProfileDto(user);
  }
}
