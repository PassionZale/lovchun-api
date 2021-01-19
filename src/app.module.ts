import { Module } from '@nestjs/common';

// CONFIG
import { JwtConfigModule } from './config/jwt/config.module';
import { TypeormConfigModule } from './config/typeorm/config.module';

// DATABASE
import { DatabaseModule } from './database/database.module';

// MODULE
import { AuthModule } from './module/auth/auth.module';
import { TagModule } from './module/tag/tag.module';
import { PostModule } from './module/post/post.module';
@Module({
  imports: [
    JwtConfigModule,
    TypeormConfigModule,

    DatabaseModule,

    AuthModule,
    TagModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
