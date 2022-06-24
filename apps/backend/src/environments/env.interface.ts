export interface IEnvironment {
  production: boolean;
  port: number;
  baseUrl: string;
  globalApiPrefix: string;
  database: IDatabaseEnvironment;
  jwt: IJwtEnvironment;
}

export interface IDatabaseEnvironment {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  debug?: boolean;
  seed?: boolean;
  updateSchema?: boolean;
}

export interface IJwtEnvironment {
  secret: string;
}
