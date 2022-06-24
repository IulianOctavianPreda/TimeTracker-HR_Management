import { Cascade, DateTimeType, Entity, EntityRepositoryType, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { ITimeOff } from '../../../domain/time-off/time-off.interface';
import { UserEntity } from '../user/user.entity';
import { TimeOffRepository } from './time-off.repository';

@Entity({ tableName: 'time-off', customRepository: () => TimeOffRepository })
export class TimeOffEntity implements ITimeOff {
  [EntityRepositoryType]?: TimeOffRepository;

  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Property({
    type: DateTimeType,
  })
  startDate: Date;

  @Property({
    type: DateTimeType,
  })
  endDate: Date;

  @Property()
  duration: number;

  @Property({ nullable: true })
  reason?: string;
}
