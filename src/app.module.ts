import { Module } from '@nestjs/common';

// CONFIG
import { JwtConfigModule } from './config/jwt/config.module';
import { TypeormConfigModule } from './config/typeorm/config.module';

@Module({
  imports: [JwtConfigModule, TypeormConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
