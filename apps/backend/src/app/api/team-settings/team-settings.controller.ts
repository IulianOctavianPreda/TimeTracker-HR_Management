import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TeamSettings, TeamSettingsUpdate } from '../dtos/team-settings.dto';
import { TeamSettingsService } from '../team-settings/team-settings.service';

@ApiTags('team-settings')
@Controller('team-settings')
export class TeamSettingsController {
  constructor(private teamSettingsService: TeamSettingsService) {}

  @Post('update')
  async updateTeamSettings(@Body() data: TeamSettingsUpdate): Promise<TeamSettings> {
    return await this.teamSettingsService.update(data);
  }

  @Get(':id')
  async getTeamSettings(@Param('id', ParseUUIDPipe) id: string): Promise<TeamSettings> {
    return await this.teamSettingsService.findById(id);
  }
}
