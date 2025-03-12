import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { Constants } from 'src/helpers/Constants';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller(Constants.subApiEndpoint + 'auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: UserRegisterDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  signup(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.signup(userRegisterDto);
  }

  @Post('signin')
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  signin(@Body() userLoginDto: UserLoginDto) {
    return this.authService.signin(userLoginDto);
  }
}
