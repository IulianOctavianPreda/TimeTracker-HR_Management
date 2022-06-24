import { Cascade, DateTimeType, Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { ITask } from '../../../domain/task/task.interface';
import { ProjectEntity } from '../project/project.entity';
import { UserEntity } from '../user/user.entity';
import { TaskRepository } from './task.repository';

@Entity({ tableName: 'task', customRepository: () => TaskRepository })
export class TaskEntity implements ITask {
  [EntityRepositoryType]?: TaskRepository;

  @PrimaryKey()
  id: string = v4();

  @Property()
  name: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, { eager: true })
  project: ProjectEntity;

  @Property({
    type: DateTimeType,
  })
  date: Date;

  @Property()
  duration: number;
}
