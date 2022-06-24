import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

import { IProject } from '../../../domain/project/project.interface';
import { ITask } from '../../../domain/task/task.interface';
import { ITeam } from '../../../domain/team/team.interface';
import { TaskEntity } from '../task/task.entity';
import { TeamEntity } from '../team/team.entity';
import { ProjectRepository } from './project.repository';

@Entity({ tableName: 'project', customRepository: () => ProjectRepository })
export class ProjectEntity implements IProject {
  [EntityRepositoryType]?: ProjectRepository;

  @PrimaryKey()
  id: string = v4();

  @Property()
  @Unique()
  name: string;

  @ManyToMany(() => TeamEntity, (team) => team.projects, {
    orderBy: { name: 'ASC' },
  })
  teams = new Collection<TeamEntity>(this) as Collection<ITeam>;

  @OneToMany(() => TaskEntity, (task) => task.project, {
    orderBy: { name: 'ASC' },
  })
  tasks = new Collection<TaskEntity>(this) as Collection<ITask>;
}
