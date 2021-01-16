import { Module } from '@nestjs/common';

// CONFIG
import { JwtConfigModule } from './config/jwt/config.module';
import { TypeormConfigModule } from './config/typeorm/config.module';

// DATABASE
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [JwtConfigModule, TypeormConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
