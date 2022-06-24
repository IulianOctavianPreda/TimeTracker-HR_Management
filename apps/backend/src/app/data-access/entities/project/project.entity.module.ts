import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { ProjectEntity } from './project.entity';

@Module({
  imports: [MikroOrmModule.forFeature([ProjectEntity])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class ProjectEntityModule {}
