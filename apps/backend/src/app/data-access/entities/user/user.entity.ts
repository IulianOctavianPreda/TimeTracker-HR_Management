import {
  Cascade,
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

import { ITask } from '../../../domain/task/task.interface';
import { ITeam } from '../../../domain/team/team.interface';
import { ITimeOff } from '../../../domain/time-off/time-off.interface';
import { IUser } from '../../../domain/user/user.interface';
import { TaskEntity } from '../task/task.entity';
import { TeamEntity } from '../team/team.entity';
import { TimeOffEntity } from '../time-off/time-off.entity';
import { UserRepository } from './user.repository';

@Entity({ tableName: 'user', customRepository: () => UserRepository })
export class UserEntity implements IUser {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: string = v4();

  @Property()
  @Unique()
  username: string;

  @Property({ lazy: true }) // lazy:true means that the password will not be loaded until it is needed
  password: string;

  @ManyToMany(() => TeamEntity, (team) => team.users, { orderBy: { name: 'ASC' } })
  teams = new Collection<TeamEntity>(this) as Collection<ITeam>;

  @OneToMany(() => TeamEntity, (team) => team.teamAdmin, { orderBy: { name: 'ASC' } })
  adminIn = new Collection<TeamEntity>(this) as Collection<ITeam>;

  @OneToMany(() => TaskEntity, (task) => task.user, {
    orderBy: { name: 'ASC' },
  })
  tasks = new Collection<TaskEntity>(this) as Collection<ITask>;

  @OneToMany(() => TimeOffEntity, (timeOff) => timeOff.user, {
    orderBy: { startDate: 'ASC' },
  })
  timeOffs = new Collection<TimeOffEntity>(this) as Collection<ITimeOff>;
}
