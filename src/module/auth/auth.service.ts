import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment-timezone';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';
import {
  setLockFileData,
  getLockFileData,
} from '@src/common/helper/lock.helper';
import { verify } from '@src/common/helper/bcryptjs.helper';
import { User } from '@src/common/interface/user.interface';
import { TIME_FORMAT } from '@src/common/constant/format.constant';
import { Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async validateUserPassword(dto: LoginRequestDto): Promise<User> {
    try {
      const { username, password } = dto;

      const user = await getLockFileData();

      if (
        username === user.username &&
        verify(password, user.hashed_password)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hashed_password, ...result } = user;

        return result;
      }
    } catch (error) {}

    return null;
  }

  public async createAccessToken(): Promise<LoginResponseDto> {
    const preUserInfo = await getLockFileData();

    const nextUserInfo = {
      ...preUserInfo,
      login_at: (moment().format(TIME_FORMAT) as unknown) as Date,
    };

    await setLockFileData(nextUserInfo);

    const sub = {
      username: nextUserInfo.username,
      login_at: nextUserInfo.login_at,
    };

    return {
      access_token: this.jwtService.sign(sub),
    };
  }

  public async validatePayload(payload: Payload): Promise<User> {
    const { username, login_at } = payload;

    const user = await getLockFileData();

    // 通过判断 lock.json 中存入的 username login_at 
    // 与 jwt 荷载中存入的 username login_at 
    // 是否完全相等来判断 access_token 是否有效
    // 因为每次登录并颁发 access_token 时会更新 lock.json 中的 login_at
    // 这样可以模拟出单点登录的效果，即每次登录后，上一次颁发的 access_token 会判断为过期
    // 缺点是无法兼容多端
    // TODO
    // 如果后续支持多端，例如 PC 和 Mobile，则需要改写这里的判断逻辑
    // 例如可以使用 username + login_at + clineId 的方式
    if (user.username === username && user.login_at === login_at) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashed_password, ...result } = user;

      return result;
    } else {
      return null;
    }
  }
}
