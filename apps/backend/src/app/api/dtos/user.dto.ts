import { OmitType, PickType } from '@nestjs/swagger';

import { UserBase } from '../../domain/user/user.base';
import { Project } from './project.dto';

export class User extends OmitType(UserBase, ['password'] as const) {
  projects: Array<Project>;
}
export class UserCreate extends PickType(UserBase, ['username', 'password'] as const) {
  teams?: Array<string>;
  tasks?: Array<string>;
}
export class UserUpdate extends OmitType(UserBase, ['id'] as const) {}
export class UserDelete extends PickType(UserBase, ['id'] as const) {}

export class AmountOfWorkDone {
  today: number;
  todayPercentage: number;
  week: number;
  weekPercentage: number;
  month: number;
  monthPercentage: number;
}
