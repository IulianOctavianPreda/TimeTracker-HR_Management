import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TimeOffEntity } from './time-off.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TimeOffEntity])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class TimeOffEntityModule {}
