import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

import { IProject } from '../../../domain/project/project.interface';
import { ITeam } from '../../../domain/team/team.interface';
import { IUser } from '../../../domain/user/user.interface';
import { ProjectEntity } from '../project/project.entity';
import { TeamSettingsEntity } from '../team-settings/team-settings.entity';
import { UserEntity } from '../user/user.entity';
import { TeamRepository } from './team.repository';

@Entity({ tableName: 'team', customRepository: () => TeamRepository })
export class TeamEntity implements ITeam {
  [EntityRepositoryType]?: TeamRepository;

  @PrimaryKey()
  id: string = v4();

  @Property()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.teams, {
    owner: true,
    orderBy: { username: 'ASC' },
  })
  users = new Collection<UserEntity>(this) as Collection<IUser>;

  @ManyToMany(() => ProjectEntity, (project) => project.teams, {
    owner: true,
    orderBy: { name: 'ASC' },
  })
  projects = new Collection<ProjectEntity>(this) as Collection<IProject>;

  @OneToOne(() => TeamSettingsEntity, (teamSettings) => teamSettings.team, {
    owner: true,
    nullable: true,
    eager: true,
  })
  teamSettings?: TeamSettingsEntity;

  @ManyToOne(() => UserEntity, {
    nullable: true,
    eager: true,
  })
  teamAdmin?: UserEntity;
}
