import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiException } from '@src/filter/api-exception.filter';
import { JwtAuthGuard } from '@src/guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';

@ApiTags('授权')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginRequestDto })
  @Post('/v1/auth/login')
  public async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.authService.validateUserPassword(dto);

    if (!user) throw new ApiException('用户名或密码错误');

    return this.authService.createAccessToken();
  }

  @ApiOperation({ summary: '校验令牌' })
  @Get('/v1/auth/validAccessToken')
  @UseGuards(JwtAuthGuard)
  public validAccessToken(): string {
    return 'ok';
  }
}
