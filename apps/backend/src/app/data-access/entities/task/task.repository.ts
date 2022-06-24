import { EntityRepository } from '@mikro-orm/postgresql';

import { TaskEntity } from './task.entity';

export class TaskRepository extends EntityRepository<TaskEntity> {}
