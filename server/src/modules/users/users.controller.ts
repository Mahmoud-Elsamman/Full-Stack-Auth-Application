import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Constants } from 'src/helpers/Constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller(Constants.subApiEndpoint + 'users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.id);
  }
}
