import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';

import { ProjectBase } from '../project/project.base';
import { UserBase } from '../user/user.base';
import { ITask } from './task.interface';

export class TaskBase implements ITask {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsObject()
  user: UserBase;

  @IsObject()
  project: ProjectBase;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  duration: number;
}
