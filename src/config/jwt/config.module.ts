import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { JwtConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default('jwt_secret'),
        JWT_EXPIRATION_TIME: Joi.string().default('6h'),
      }),
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}
