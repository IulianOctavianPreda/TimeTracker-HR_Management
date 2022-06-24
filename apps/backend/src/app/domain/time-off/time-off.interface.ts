import { IUser } from '../user/user.interface';

export interface ITimeOff {
  id: string;
  user: IUser;
  startDate: Date;
  endDate: Date;
  duration: number;
  reason?: string;
}
