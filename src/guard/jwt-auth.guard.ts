import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VerifyErrors } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { ApiException } from '@src/filter/api-exception.filter';
import { JwtErrorName } from '@src/common/enum/jwt-error-name.enum';
import { ApiErrorCode } from '@src/common/enum/api-error-code.enum';
import { User } from '@src/common/interface/user.interface';
import { DEFAULT_JWT_ERROR_MESSAGE } from '@src/common/constant/text.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err?: ApiException, user?: User, info?: VerifyErrors): any {
    // user 由 jwt.strategy.ts 中的 validate() 所返回
    if (user && !err && !info) {
      return user;
    }

    // err 由 jwt.strategy.ts 中的 validate() 所抛出
    if (err) {
      throw err;
    }

    // info 由 PassportStrategy 解析 jwt 失败所抛出
    if (info) {
      const name = info.name;

      throw new ApiException(
        JwtErrorName[name] ? JwtErrorName[name] : DEFAULT_JWT_ERROR_MESSAGE,
        ApiErrorCode.ACCESS_TOKEN_INVALID,
      );
    }
  }
}
