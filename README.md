# HrManagement

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@hc/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

# Introduction

TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

# Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

# Build and Test

TODO: Describe and show how to build your code and run the tests.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

# Dev env

# Setup

- https://dev.to/ipreda/nx-pnpm-fixing-the-pnpx-command-2e06
- Open powershell
- `new-item $PROFILE.CurrentUserAllHosts -ItemType file -Force`
- `ise $PROFILE.CurrentUserAllHosts`
- `close ise`
- `Set-ExecutionPolicy -Scope CurrentUser`
- `RemoteSigned`
- `ise $PROFILE.CurrentUserAllHosts`

- Add to that file

```powershell
function pnpx {
    $joinedArgs = $args -join " "
    pnpm exec $joinedArgs
}
```

## Husky - linting and code formatting

- `pnpm install husky -D`
- add `"prepare": "husky install"` to `package.json`
- run `pnpm run prepare`
- add husky config to `./husky` folder https://blog.typicode.com/husky-git-hooks-javascript-config/

## Add azure user to source tree

- create a PAT
- go to sourcetree
- create a user
- use `https://ip-hashcode.visualstudio.com ` as host
- click regenerate personal access token (PAT)
- use the PAT created as both username and password

## OpenApi

- The backend will always auto generate the types and expose them through OpenApi
- The Frontend will generate the types to keep them in sync
- This decision was taken to future-proof separation between the frontend and backend for future integrations and development.

## NestJs

### 1.Fastify

- https://docs.nestjs.com/techniques/performance#performance-fastify
- As long as this project does not require explicitly an `express plugin`, fastify should be used for better performance
- `pnpm i --save @nestjs/platform-fastify`

### 2.Add OpenAPI

- https://docs.nestjs.com/openapi/introduction
- `pnpm install --save @nestjs/swagger swagger-ui-express` unless we are using fastify
- `pnpm install --save @nestjs/swagger fastify-swagger`
- https://dev.to/ipreda/nx-nestjs-how-to-autogenerate-openapiswagger-specs-518n
- go to apps/api/project.json
- edit the build command to
- ADD @ApiTags("<NAME OF CONTROLLER>") on all controllers since it it used to generate the service names in the frontend

```
"build": {
      "executor": "@nrwl/node:webpack",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/api",
        "main": "apps/api/src/main.ts",
        "tsConfig": "apps/api/tsconfig.app.json",
        "tsPlugins": [
          {
            "name": "@nestjs/swagger/plugin",
            "options": {
              "dtoFileNameSuffix": [".entity.ts", ".dto.ts"],
              "controllerFileNameSuffix": [".controller.ts"],
              "classValidatorShim": true,
              "dtoKeyOfComment": "description",
              "controllerKeyOfComment": "description",
              "introspectComments": true
            }
          }
        ],
        "assets": ["apps/api/src/assets"]
      },
```

#### 2.1 Global api prefix

- All controllers should be prefixed with the earliest version they are available to.
- All DTOs should be named using `name.dto.ts`to be seen by the plugin. For custom options check https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin
- you can access the json at http://localhost:3000/api/openApi/json or the documentation at http://localhost:3000/api/openApi. by default it was set to http://localhost:3000/api but the settings were overwritten in main.ts

### 3 Dynamic config

- https://dev.to/ipreda/nx-nestjs-easy-way-to-get-autofill-and-validate-environment-variables-a4m
- https://docs.nestjs.com/techniques/configuration
- `pnpm install --save @nestjs/config class-validator class-transformer`
- Create a file called `environments/env-config.ts` which will host the
- Then extend `environment.ts` with the `Partial<IEnvironment>` interface
- Add the `ConfigModule` to the imports in the app module using the custom loader

```typescript
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './environments/env-config';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
})
```

- Right now the app will get the config to start either from the environment constants or from the variables set in the container.
- Configure `main.ts` to use the `ConfigService` to access the configured port, globalApiPrefix and baseUrl.

#### 3.1 Config Schema validation - if needed

For options that need to be present at all times, we need to validate that they are set

- https://docs.nestjs.com/techniques/configuration#custom-validate-function
- create custom validation function based on classes. Check `environments/env-validation.ts`

### 4. TypeORM - Database connection

- https://betterprogramming.pub/nest-js-project-with-typeorm-and-postgres-ce6b5afac3be
- https://docs.nestjs.com/techniques/database
- https://dev.to/ipreda/nx-nestjs-typeorm-database-connection-with-environment-variables-1na6
- `pnpm install --save @nestjs/typeorm typeorm@0.3 pg`

### 4. MikrOrm - Database connection

- https://mikro-orm.io/docs/usage-with-nestjs
- `pnpm i -s @mikro-orm/core @mikro-orm/nestjs @mikro-orm/postgresql`
- create `mikro-orm-config.service.ts`
- add:

```ts
import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvironment } from '../environments/env.interface';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createMikroOrmOptions(): MikroOrmModuleOptions {
    const db = this.config.get<IEnvironment['database']>('database') as IEnvironment['database'];
    return {
      type: 'postgresql',
      host: db.host,
      port: db.port,
      dbName: db.database,
      user: db.username,
      password: db.password,
      autoLoadEntities: true,
      allowGlobalContext: true, // important to make the custom repositories available globally in the app
      forceUtcTimezone: true,
    };
  }
}
```

-go to `app.module.ts` and add `MikroOrmModule.forRootAsync({ useClass: MikroOrmConfigService }),`

- add to `main.ts` `app.enableShutdownHooks();` // to make sure the database is closed when the app is shut down

#### Architecture with mikro-orm

- data-access => entity(UserEntity), repository (UserRepository extends Repository<UserEntity>) + export in GLOBAL module of entity (in turn it will make the repository a global singleton)

- domain => entity interface (IUser) + entity object (User) (used for validating fields) ~~+ service (User service)~~

- api =>Controllers + api/business services + Dto's create/update/delete in a single file which will extend the entity object (User) using utilitary classes like Partial, Pick, Omit (this will automatically add validations)

Ideas for the future:

- split project in multiple libraries - https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice
- map objects from dtos to domain entities to db entities (if it's the case)

DTOs right now extend the entity object because the base class needs to contain .entity or .dto to provide additional metadata. It can be changed obviously but it's not a good idea to do it.

#### 4.1 Database publish and migrations

- `pnpm i --save-dev @mikro-orm/cli`
- `pnpm install --save-dev @alexy4744/nx-mikro-orm-cli`
- run `nx generate @alexy4744/nx-mikro-orm-cli:config` with:
  - Name of project
  - "configPaths": ["./mikro-orm.config.ts"],
  -      "tsConfigPath": "./tsconfig.json",
  -      "useTsNode": true
- `pnpm i --save-dev ts-node`
- create file `mikro-orm.config.ts` in the root of the project
- add the following to the file
- reuse logic to get the env config

```ts
import { getEnvConfig } from './src/environments/env-config';
import { env } from './src/environments/environment';

const db = getEnvConfig(env).database;
export default Promise.resolve({
  entities: [__dirname + '/src/domain/**/*.entity{.ts,.js}'],
  tsEntities: [__dirname + '/src/domain/**/*.entity.ts'],
  type: 'postgresql',
  host: db.host,
  port: db.port,
  dbName: db.database,
  user: db.username,
  password: db.password,
  autoLoadEntities: true,
  // default values:
  schemaGenerator: {
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    createForeignKeyConstraints: true, // whether to generate FK constraints
  },
});
```

- run custom commands like `nx mikro-orm my-project --args="schema:update --run"`

#### 4.2 Database migrations

https://mikro-orm.io/docs/migrations#initial-migration

- `pnpm i --save-dev @mikro-orm/migrations`
- add to the `mikro-orm.config.ts` file

```ts
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: __dirname + '/migrations', // path to the folder with migrations
    pathTs: __dirname + '/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: false, // allow to disable table dropping
    safe: true, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
```

- run custom commands like `nx mikro-orm my-project --args="migration:create"`

#### 4.3 Try to replace the @alexy4744/nx-mikro-orm-cli:run

- steps add package.json to the project with:

```
{
  "mikro-orm": {
    "configPaths": [
      "./mikro-orm.config.ts"
    ],
    "tsConfigPath": "./tsconfig.json",
    "useTsNode": true
  }
}
```

- add executors for custom commands

#### 4.4 Database autoseed on startup

https://github.com/mikro-orm/nestjs-realworld-example-app/blob/master/src/mikro-orm.config.ts.example
in main.ts add

```ts
await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
await app.get(MikroORM).getSchemaGenerator().updateSchema();
```

#### 4.5 links

https://mikro-orm.io/docs/migrations#initial-migration
https://mikro-orm.io/docs/schema-generator
https://mikro-orm.io/docs/seeding

- `pnpm i @mikro-orm/seeder`
- Create `seeder` folder near entities
- Create factories https://mikro-orm.io/docs/seeding#entity-factories like this with `faker` or create manual entities in the factory for better management (since they can be used for initial db seeding afterwards)
- Add to `mikro-orm.config.ts`

```ts

  seeder: {
    path: __dirname + '/src/data-access/seeder', // path to the folder with seeders
    pathTs: __dirname + '/src/data-access/seeder', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
```

- run custom commands like `nx mikro-orm my-project --args="seeder:run"` or add executor for it in `project.json`

```json
 "seed": {
      "executor": "nx:run-commands",
      "options": {
        "command": "nx mikro-orm api --args=\"seeder:run\""
      }
    },

  "migration-fresh": {
      "executor": "nx:run-commands",
      "options": {
        "command": "nx mikro-orm api --args=\"migration:fresh --seed\""
      }
    },

    "schema-fresh": {
      "executor": "nx:run-commands",
      "options": {
        "command": "nx mikro-orm api --args=\"schema:fresh --run --seed\""
      }
    },
```

#### 4.6 Random

- ManyToMany relationships need a mapped by property declared (eg id), they need to have a collection initialized from Mikroorm package, also set the cascading to delete orphans since we don't need anything else
- Change the usage of Collection to a serialize/deserializaed property (if nothing better is available)

### 5. Authentication

- https://docs.nestjs.com/security/authentication#authentication
- `pnpm install --save @nestjs/passport passport passport-local @nestjs/jwt passport-jwt`
- `pnpm install --save-dev @types/passport-local @types/passport-jwt`

### 6. Hashing

- https://docs.nestjs.com/security/encryption-and-hashing
- `pnpm i bcrypt`
- `pnpm i --save-dev @types/bcrypt`

### Validation

https://docs.nestjs.com/techniques/validation

- `pnpm i --save class-validator class-transformer`
- Use global pipes with auto validation
- Use stripping properties
- Use transform payload
- Use explicit conversion on controller for validation of id's and others
- Use partial/pick/omit types from `nestJs/swagger` package

## Docker (vmmem process) consumes too much RAM

- go to `C:\Users\your-username\.wslconfig` or create the file at the specified path
- add

```
# Settings apply across all Linux distros running on WSL 2
# Can see memory in wsl2 with "wsl" then "free -m"
# Goes in windows home directory as .wslconfig
[wsl2]
# Removes ability to host GUI Apps
guiApplications=false

# Limits VM memory to use no more than 2 GB, defaults to 50% of ram
memory=2GB

# Sets the VM to use 2 virtual processors
processors=2

# Sets the amount of swap storage space to 16GB, default is 25% of available RAM
swap=16GB
```

## Tools

- Vs Code
- NX
- Docker
- Kubernetes
-

## Database

Citus - https://www.citusdata.com/download/
Run `docker run -d --name citus -p 5432:5432 -e POSTGRES_PASSWORD=password citusdata/citus:10.2`
Check if it works running `psql -U postgres -h localhost -d postgres -c "SELECT * FROM citus_version();"`

- in vs code add
  - https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools
  - https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-pg
- then add the connection with `username:postgres`, `host:localhost` `database:postgres` `password:password`

## VS Code extensions

- Prettier
- EsLint
-

## Steps

- Docker
- Database

- Nx
- create a new project NestJs + Angular
- Setup NestJs Config Module
- Setup NestJs Fastify
- Setup NestJs Swagger
- Setup NestJs TypeORM
- Setup NestJs Validation
- Setup NestJs Migrations
- Setup NestJs Seeding
- Setup NestJs Database Autoseed
- Setup NestJs JWT
- Setup NestJs Passport
- Setup NestJs Authentication
- Setup NestJs Hashing

- Angular
- Setup Angular PrimeNg
- Setup Angular Tailwind
- Setup Angular Formly
- Setup Transloco
- Setup Angular Auth intercepter
- Setup Angular Auth Guard

### Angular

#### PrimeNG

- `pnpm install --save primeng primeicons`
- animations `pnpm install --save @angular/animations @angular/cdk`
- Check for new free themes here https://www.primefaces.org/primeng/setup
- To add dynamic themes check https://github.com/yigitfindikli/primeng-dynamic-theming
  (just add them to the `project.json` file in the styles config without injecting them by default, then set up at runtime which one should be downloaded)
  Create service to change themes, add theme style with id in the index.html file

#### Angular Tailwind

Just run NX schema generator

#### Transloco

TODO - later

#### Formly

-`pnpm install @angular/forms @ngx-formly/core @ngx-formly/primeng --save`

#### OpenAPI generator

- https://openapi-generator.tech/docs/usage
- `pnpm install @openapitools/openapi-generator-cli -D`

- Some of the parameters are from the generator and some from the extension (aka typescript-angular)
  https://openapi-generator.tech/docs/generators/typescript-angular/
  https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-gradle-plugin
  https://stackoverflow.com/questions/65196962/how-to-use-configuration-file-openapitools-json-with-openapitools-openapi-gen

- Create open-api/config.json

```json
{
  "apiModulePrefix": "DataContracts",
  "enumNameSuffix": "",
  "supportsES6": true,
  "useSingleRequestParameter": false,
  "fileNaming": "kebab-case",
  "stringEnums": false,
  "engine": "handlebars",
  "removeOperationIdPrefix": true,
  "removeOperationIdPrefixDelimiter": "_",
  "removeOperationIdPrefixCount": -1
}
```

- add script `openapi-generator-cli generate -g typescript-angular -c open-api/config.json -i open-api/api.json -o libs/frontend/data-contracts/src/lib`
- in app.module add `ApiModule.forRoot({ rootUrl: 'https://www.example.com/api' }),` - basePath can be taken from env variable

##### Alternative - maybe

https://www.npmjs.com/package/ng-openapi-gen

- `pnpm i ng-openapi-gen`
- add script `"generate-frontend-contracts": "ng-openapi-gen --input open-api/api.json --output libs/frontend/data-contracts/src/lib"`
- in app.module add `ApiModule.forRoot({ rootUrl: 'https://www.example.com/api' }),` - root url can be taken from env variable

## Guidelines

### Backend

- do not use DTO in name only in extension
- Use <Class>Entity for table entities. Map them to tables without `entity` in name. Repositories are without enitiy in name
- Base classes for validation use <Class>Base in name. Can use ORM defined classes
- do not use class transform with MikroOrm
- Create automapper or manual map each of the entities to the DTOs

### Frontend

- Adding projects -> single select grouping based on Org Projects, Team Projects, User Projects(this is done using the create project wizard and selecting based on permissions if you can create a project for yourself, your team or organization)

### References

- https://anil-pace.medium.com/json-web-tokens-vs-oauth-2-0-85dd0b32057d#:~:text=So%20the%20real%20difference%20is,JWT%20as%20a%20token%20format.
- https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/refreshing-a-token-(silent-refresh).html
- https://betterprogramming.pub/nestjs-authentication-with-jwt-and-postgres-50de6341f490
- https://stackoverflow.com/questions/175532/should-a-retrieval-method-return-null-or-throw-an-exception-when-it-cant-prod
- https://progressivecoder.com/guide-to-mikroorm-nestjs-integration/
- https://mikro-orm.io/docs/custom-types#arraytype
- https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators
- https://github.com/nestjs/mapped-types/blob/master/lib/omit-type.helper.ts
- https://stackoverflow.com/questions/54813329/adding-properties-to-a-class-via-decorators-in-typescript
- https://docs.nestjs.com/pipes

- https://uxdesign.cc/top-navigation-vs-side-navigation-wich-one-is-better-24aa5d835643
- https://tailwindcss.com/docs/grid-template-columns#using-custom-values
- https://stackoverflow.com/questions/41725725/access-css-variable-from-javascript
- https://angular.io/guide/router
- https://www.primefaces.org/primeng/sidebar

### TODO

- Team settings
- ORG settings
