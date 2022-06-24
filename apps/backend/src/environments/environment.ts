import { IEnvironment } from './env.interface';

export const env: Partial<IEnvironment> = {
  production: false,
  globalApiPrefix: 'api',
  port: 3333,
  baseUrl: 'http://localhost',
  database: {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'password',
    debug: false,
    seed: false,
    updateSchema: true,
  },
  jwt: {
    secret: 'secret',
  },
};
