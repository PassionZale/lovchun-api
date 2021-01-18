import { NestFactory } from '@nestjs/core';
import * as moment from 'moment-timezone';

import { AppModule } from './app.module';
import { TypeormConfigService } from './config/typeorm/config.service';
import { updateOrmConfigFileSync } from './common/helper/typeorm.helper';
import { updateLockFileSync } from './common/helper/lock.helper';

// 设置默认时区为东八区
// 所有涉及时间获取及输出，统一使用 moment-timezone
moment.tz.setDefault('Asia/Shanghai');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 读取 TypeormConfig
  const typeormConfig: TypeormConfigService = app.get(TypeormConfigService);

  // 在运行 typeorm 相关命令，如：迁移、生成迁移等等时，typeorm-cli 会读取 ./ormconfig.json
  // 因此必须确保 ormconfig.json 存在，并且是依据 typeormConfig.configs 所生成的
  // 由于 typeormConfig.configs 可以被随意更改
  // 因此每次运行项目 ./ormconfig.json 都会被删除并重新创建，以此保证它是依据最新的配置项所创建的
  updateOrmConfigFileSync(typeormConfig.configs);

  // 在使用 Docker 运行容器时, ./lock.json 是一个挂载文件
  // 因此必须确保 lock.json 存在
  updateLockFileSync();

  await app.listen(3000);
}

bootstrap();
