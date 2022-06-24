import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { TaskBase } from '../task/task.base';
import { TeamBase } from '../team/team.base';
import { TimeOffBase } from '../time-off/time-off.base';
import { IUser } from './user.interface';

export class UserBase implements IUser {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  teams: Array<TeamBase>;

  @IsArray()
  adminIn: Array<TeamBase>;

  @IsArray()
  tasks: Array<TaskBase>;

  @IsArray()
  timeOffs: Array<TimeOffBase>;
}
