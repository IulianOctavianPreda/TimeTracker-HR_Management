import { MikroORM } from '@mikro-orm/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { DatabaseSeeder } from './app/data-access/seeder/database-seeder';
import { IEnvironment } from './environments/env.interface';
import { env } from './environments/environment';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
async function bootstrap() {
  const fastifyOptions: ConstructorParameters<typeof FastifyAdapter>[0] = {
    logger: false,
  };
  const fastifyAdapter = new FastifyAdapter(fastifyOptions);
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

  app.enableShutdownHooks();
  app.enableCors();

  const config: ConfigService = app.get(ConfigService);
  const globalApiPrefix = config.get<IEnvironment['globalApiPrefix']>('globalPrefix') ?? 'api';

  app.setGlobalPrefix(globalApiPrefix);
  setupOpenApi(app);
  setupAutoValidation(app);
  await setupDatabaseSeeding(app);

  const port = config.get<IEnvironment['port']>('port') ?? 3333;
  await app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
    }
    const baseUrl = config.get<IEnvironment['baseUrl']>('baseUrl') ?? 'http://localhost';
    Logger.log(`🚀 Application is running on: ${baseUrl}:${port}/${globalApiPrefix}`);
  });
}

bootstrap();

function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder().setTitle('API Documentation').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openApi', app, document, { useGlobalPrefix: true });
}

async function setupDatabaseSeeding(app: INestApplication) {
  if (!env.production) {
    await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
    if (env?.database?.updateSchema) await app.get(MikroORM).getSchemaGenerator().updateSchema({ safe: true });
    if (env?.database?.seed) await app.get(MikroORM).getSeeder().seed(DatabaseSeeder);
  }
}

function setupAutoValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // filter out properties that should not be received by the method handler
      transform: true, // transform the received data before validation
    })
  );
}
