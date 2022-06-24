import { Collection } from '@mikro-orm/core';

import { ITask } from '../task/task.interface';
import { ITeam } from '../team/team.interface';
import { ITimeOff } from '../time-off/time-off.interface';

export interface IUser {
  id: string;
  username: string;
  password: string;
  teams: Array<ITeam> | Collection<ITeam, any>;
  adminIn: Array<ITeam> | Collection<ITeam, any>;
  tasks: Array<ITask> | Collection<ITask, any>;
  timeOffs: Array<ITimeOff> | Collection<ITimeOff, any>;
}
