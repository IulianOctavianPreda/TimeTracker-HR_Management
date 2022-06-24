import { mikroOrmConfigBase } from 'mikro-orm.config.base';

import { getEnvConfig } from './src/environments/env-config';
import { env } from './src/environments/environment';

const db = getEnvConfig(env).database;

const config = {
  ...mikroOrmConfigBase(__dirname),
  host: db.host,
  port: db.port,
  dbName: db.database,
  user: db.username,
  password: db.password,
};
export default Promise.resolve(config);
