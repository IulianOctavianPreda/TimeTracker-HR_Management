import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TeamEntity } from './team.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TeamEntity])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class TeamEntityModule {}
