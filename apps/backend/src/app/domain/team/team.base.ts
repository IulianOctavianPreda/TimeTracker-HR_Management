import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

import { ProjectBase } from '../project/project.base';
import { TeamSettingsBase } from '../team-settings/team-setting.base';
import { UserBase } from '../user/user.base';
import { ITeam } from './team.interface';

export class TeamBase implements ITeam {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  users: Array<UserBase>;

  @IsArray()
  projects: Array<ProjectBase>;

  @IsObject()
  @IsOptional()
  teamSettings?: TeamSettingsBase;

  @IsObject()
  @IsOptional()
  teamAdmin?: UserBase;
}
