import { OmitType, PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { TimeOffBase } from '../../domain/time-off/time-off.base';

export class TimeOff extends OmitType(TimeOffBase, [] as const) {}
export class TimeOffCreate extends PickType(TimeOffBase, ['startDate', 'endDate', 'duration', 'reason'] as const) {
  @IsUUID()
  userId: string;
}
export class TimeOffUpdate extends OmitType(TimeOffBase, ['id'] as const) {}
export class TimeOffDelete extends PickType(TimeOffBase, ['id'] as const) {}
