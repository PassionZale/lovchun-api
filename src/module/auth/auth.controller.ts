import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/v1/auth/login')
  public async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { username, password } = dto

    return { access_token: 'access_token_sample' }
  }
}
