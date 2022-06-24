import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { IEnvironment } from '../../environments/env.interface';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private config: ConfigService) {}

  public createJwtOptions(): JwtModuleOptions {
    const jwt = this.config.get<IEnvironment['jwt']>('jwt') as IEnvironment['jwt'];
    return {
      secret: jwt.secret,
      signOptions: { expiresIn: '7d' },
    };
  }
}
