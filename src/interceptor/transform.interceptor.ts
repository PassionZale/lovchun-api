import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseResponse } from '@src/common/interface/base-response.interface';
import { ApiResponse } from '@src/filter/api-response.filter';

/**
 * 使用 ApiResponse 格式化响应数据结构
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<BaseResponse<T>> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof ApiResponse) {
          return data.getResponse();
        }

        const response = new ApiResponse(data);

        return response.getResponse();
      }),
    );
  }
}
