import { Collection } from '@mikro-orm/core';

import { ITask } from '../task/task.interface';
import { ITeam } from '../team/team.interface';

export interface IProject {
  id: string;
  name: string;
  teams: Array<ITeam> | Collection<ITeam>;
  tasks: Array<ITask> | Collection<ITask, any>;
}
