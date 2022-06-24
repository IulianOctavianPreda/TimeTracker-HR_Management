import { IsArray, IsString } from 'class-validator';

import { ITask } from '../task/task.interface';
import { TeamBase } from '../team/team.base';
import { IProject } from './project.interface';

export class ProjectBase implements IProject {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  teams: Array<TeamBase>;

  @IsArray()
  tasks: Array<ITask>;
}
