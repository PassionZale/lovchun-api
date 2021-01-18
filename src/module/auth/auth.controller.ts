import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiException } from '@src/filter/api-exception.filter';
import { JwtAuthGuard } from '@src/guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/v1/auth/login')
  public async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUserPassword(dto);

    if (!user) throw new ApiException('用户名或密码错误');

    return this.authService.createAccessToken();
  }

  @Get('/v1/auth/login')
  @UseGuards(JwtAuthGuard)
  public testJwtGuard(): string {
    return 'ok';
  }
}
