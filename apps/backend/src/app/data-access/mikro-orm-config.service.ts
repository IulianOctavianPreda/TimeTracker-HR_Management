import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mikroOrmConfigBase } from 'mikro-orm.config.base';

import { IEnvironment } from '../../environments/env.interface';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createMikroOrmOptions(): MikroOrmModuleOptions {
    const db = this.config.get<IEnvironment['database']>('database') as IEnvironment['database'];
    return {
      autoLoadEntities: true,
      ...mikroOrmConfigBase(__dirname),
      host: db.host,
      port: db.port,
      dbName: db.database,
      user: db.username,
      password: db.password,
    };
  }
}
