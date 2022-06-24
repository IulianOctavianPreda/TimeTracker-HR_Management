import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { TeamSettingsEntity } from './team-settings.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TeamSettingsEntity])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class TeamSettingsEntityModule {}
