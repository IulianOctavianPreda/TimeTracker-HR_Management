import { Injectable, NotFoundException } from '@nestjs/common';

import { TeamSettingsRepository } from '../../data-access/entities/team-settings/team-settings.repository';
import { mapToDto } from '../../data-access/mapper/dto.mapper';
import { ITeamSettings } from '../../domain/team-settings/team-settings.interface';
import { TeamSettings, TeamSettingsUpdate } from '../dtos/team-settings.dto';

@Injectable()
export class TeamSettingsService {
  constructor(private readonly teamSettingsRepository: TeamSettingsRepository) {}

  async update(teamSettings: TeamSettingsUpdate) {
    const updatedTeamSettings = (await this.teamSettingsRepository.findOne({ id: teamSettings.id })) as ITeamSettings;
    if (!updatedTeamSettings) throw new NotFoundException(`TeamSettings with id ${teamSettings.id} not found`);
    Object.assign(updatedTeamSettings, teamSettings);

    await this.teamSettingsRepository.persistAndFlush(updatedTeamSettings);
    return mapToDto(updatedTeamSettings, TeamSettings);
  }

  async findById(id: string) {
    const teamSettings = await this.teamSettingsRepository.findOne({ id });
    if (teamSettings) return mapToDto(teamSettings, TeamSettings);

    throw new NotFoundException(`TeamSettings with id ${id} not found`);
  }
}
