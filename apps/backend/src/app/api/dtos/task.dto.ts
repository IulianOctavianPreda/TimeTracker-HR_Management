import { OmitType, PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { TaskBase } from '../../domain/task/task.base';

export class Task extends OmitType(TaskBase, [] as const) {}
export class TaskCreate extends PickType(TaskBase, ['name', 'date', 'duration'] as const) {
  @IsUUID()
  userId: string;

  @IsUUID()
  projectId?: string;
}
export class TaskUpdate extends OmitType(TaskBase, ['id'] as const) {}
export class TaskDelete extends PickType(TaskBase, ['id'] as const) {}
