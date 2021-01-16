import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as moment from 'moment-timezone';

/**
 * 设置默认时区为东八区
 * 所有涉及时间获取及输出，统一使用 moment-timezone
 */
moment.tz.setDefault('Asia/Shanghai');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
