import { Module } from '@nestjs/common';

// CONFIG
import { JwtConfigModule } from './config/jwt/config.module'

@Module({
  imports: [JwtConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
