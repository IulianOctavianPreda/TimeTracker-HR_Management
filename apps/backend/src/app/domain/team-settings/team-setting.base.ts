import { IsNumber, IsObject, IsString } from 'class-validator';

import { ITeam } from '../team/team.interface';
import { ITeamSettings } from './team-settings.interface';

export class TeamSettingsBase implements ITeamSettings {
  @IsString()
  id: string;

  @IsNumber()
  workHours: number;

  @IsNumber()
  weekDays: number;

  @IsObject()
  team: ITeam;
}
