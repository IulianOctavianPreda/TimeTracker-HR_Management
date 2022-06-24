import { Global, Module } from '@nestjs/common';

import { EntitiesModule } from './entities/entities.module';

@Global()
@Module({
  imports: [EntitiesModule],
  controllers: [],
  providers: [],
  exports: [EntitiesModule],
})
export class DataAccessModule {}
