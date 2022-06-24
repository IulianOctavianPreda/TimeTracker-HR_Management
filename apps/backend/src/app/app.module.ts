import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { getEnvConfig } from '../environments/env-config';
import { envValidation } from '../environments/env-validator';
import { env } from '../environments/environment';
import { BusinessModule } from './api/business.model';
import { AuthModule } from './auth/auth.module';
import { DataAccessModule } from './data-access/data-access.module';
import { MikroOrmConfigService } from './data-access/mikro-orm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => getEnvConfig(env)],
      isGlobal: true,
      cache: true,
      validate: () => envValidation(env),
    }),
    MikroOrmModule.forRootAsync({ useClass: MikroOrmConfigService }),
    BusinessModule,
    DataAccessModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
