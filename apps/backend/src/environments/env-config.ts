import { DeepPartial, mergeObject } from '@shared';

import { IEnvironment } from './env.interface';

/** Environment variables take precedence */
export function getEnvConfig(env: Partial<IEnvironment>) {
  const envVariables = parseEnvVariables();
  return mergeObject(env, envVariables);
}

function parseEnvVariables() {
  const envVariables: DeepPartial<IEnvironment> = {};
  const env = process.env;
  if (env) {
    if (env.PRODUCTION) envVariables.production = env.PRODUCTION === 'true';
    if (env.PORT) envVariables.port = parseInt(env.PORT, 10);
    if (env.BASE_URL) envVariables.baseUrl = env.BASE_URL;
    if (env.GLOBAL_API_PREFIX) envVariables.globalApiPrefix = env.GLOBAL_API_PREFIX;

    envVariables.database = {};
    if (env.DATABASE_HOST) envVariables.database.host = env.DATABASE_HOST;
    if (env.DATABASE_PORT) envVariables.database.port = parseInt(env.DATABASE_PORT, 10);
    if (env.DATABASE_DATABASE) envVariables.database.database = env.DATABASE_DATABASE;
    if (env.DATABASE_USERNAME) envVariables.database.username = env.DATABASE_USERNAME;
    if (env.DATABASE_PASSWORD) envVariables.database.password = env.DATABASE_PASSWORD;
    if (env.DATABASE_DEBUG) envVariables.database.debug = env.DATABASE_DEBUG === 'true';
    if (env.DATABASE_SEED) envVariables.database.seed = env.DATABASE_SEED === 'true';
    if (env.DATABASE_UPDATE_SCHEMA) envVariables.database.updateSchema = env.DATABASE_UPDATE_SCHEMA === 'true';

    envVariables.jwt = {};
    if (env.JWT_SECRET) envVariables.jwt.secret = env.JWT_SECRET;
  }
  return envVariables;
}
