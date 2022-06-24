import { EntityRepository } from '@mikro-orm/postgresql';

import { TimeOffEntity } from './time-off.entity';

export class TimeOffRepository extends EntityRepository<TimeOffEntity> {}
