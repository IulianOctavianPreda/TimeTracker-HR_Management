import { Cascade, Entity, EntityRepositoryType, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { ITeamSettings } from '../../../domain/team-settings/team-settings.interface';
import { TeamEntity } from '../team/team.entity';
import { TeamSettingsRepository } from './team-settings.repository';

@Entity({ tableName: 'team-settings', customRepository: () => TeamSettingsRepository })
export class TeamSettingsEntity implements ITeamSettings {
  [EntityRepositoryType]?: TeamSettingsRepository;

  @PrimaryKey()
  id: string = v4();

  @Property({ default: 8 })
  workHours: number;

  @Property({ default: 5 })
  weekDays: number;

  @OneToOne(() => TeamEntity, (team) => team.teamSettings)
  team: TeamEntity;
}
