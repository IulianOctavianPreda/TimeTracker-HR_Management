import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TaskEntity } from './task.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TaskEntity])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class TaskEntityModule {}
