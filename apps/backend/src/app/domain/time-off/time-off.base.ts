import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

import { UserBase } from '../user/user.base';
import { ITimeOff } from './time-off.interface';

export class TimeOffBase implements ITimeOff {
  @IsString()
  id: string;

  @IsObject()
  user: UserBase;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsNumber()
  duration: number;

  @IsString()
  @IsOptional()
  reason?: string;
}
