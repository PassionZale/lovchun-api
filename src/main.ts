import { NestFactory } from '@nestjs/core';
import * as moment from 'moment-timezone';

import { AppModule } from './app.module';
import { TypeormConfigService } from './config/typeorm/config.service';
import { updateOrmConfigFileSync } from './common/helper/typeorm.helper';


/**
 * 设置默认时区为东八区
 * 所有涉及时间获取及输出，统一使用 moment-timezone
 */
moment.tz.setDefault('Asia/Shanghai');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 读取 TypeormConfig
  const typeormConfig: TypeormConfigService = app.get(TypeormConfigService);

  // 根据 TypeormConfig 创建 ormconfig.json
  updateOrmConfigFileSync(typeormConfig.configs);

  await app.listen(3000);
}

bootstrap();
