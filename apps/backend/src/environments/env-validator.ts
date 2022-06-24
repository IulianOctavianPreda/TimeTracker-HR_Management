import { plainToClass } from 'class-transformer';
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString, validateSync } from 'class-validator';

import { getEnvConfig } from './env-config';
import { IDatabaseEnvironment, IEnvironment, IJwtEnvironment } from './env.interface';

class DatabaseEnvironment implements IDatabaseEnvironment {
  @IsString()
  host: string;
  @IsNumber()
  port: number;
  @IsString()
  database: string;
  @IsString()
  username: string;
  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  debug?: boolean;

  @IsBoolean()
  @IsOptional()
  seed?: boolean;

  @IsBoolean()
  @IsOptional()
  updateSchema?: boolean;
}

class JwtEnvironment implements IJwtEnvironment {
  @IsString()
  secret: string;
}

class Environment implements IEnvironment {
  @IsBoolean()
  production: boolean;

  @IsNumber()
  port: number;

  @IsString()
  baseUrl: string;

  @IsString()
  globalApiPrefix: string;

  @IsObject()
  database: DatabaseEnvironment;

  @IsObject()
  jwt: JwtEnvironment;
}

export function envValidation(env: Partial<IEnvironment>) {
  const config = getEnvConfig(env);
  const validatedConfig = plainToClass(Environment, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
