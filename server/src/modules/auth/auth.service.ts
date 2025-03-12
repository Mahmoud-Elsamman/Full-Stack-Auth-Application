import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly logger: AppLogger,
  ) {}

  async signup(userRegisterDto: UserRegisterDto) {
    try {
      this.logger.log('Signup method called');

      const { username, email, password } = userRegisterDto;

      const userExists = await this.userModel.findOne({ email });
      if (userExists) throw new BadRequestException('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        email,
        name: username,
        password: hashedPassword,
      });

      const payload = {
        id: user._id,
        email: user.email,
        date: Date.now(),
      };

      const token = this.jwtService.sign(payload);

      this.logger.log('User created successfully');
      return new UserDto(user, token);
    } catch (exception: any) {
      this.logger.error(exception.message);
      throw new BadRequestException(exception.message);
    }
  }

  async signin(userLoginDto: UserLoginDto) {
    try {
      this.logger.log('Signin method called');

      const { email, password } = userLoginDto;

      const user = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');

      const payload = {
        id: user._id,
        email: user.email,
        date: Date.now(),
      };

      const token = this.jwtService.sign(payload);

      this.logger.log('User logged in successfully');

      return new UserDto(user, token);
    } catch (exception: any) {
      this.logger.error(exception.message);
      throw new BadRequestException(exception.message);
    }
  }
}
