import { Module } from '@nestjs/common';

import { TeamSettingsController } from './team-settings.controller';
import { TeamSettingsService } from './team-settings.service';

@Module({
  imports: [],
  controllers: [TeamSettingsController],
  providers: [TeamSettingsService],
  exports: [TeamSettingsService],
})
export class TeamSettingsModule {}
