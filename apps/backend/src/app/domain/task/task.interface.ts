import { IProject } from '../project/project.interface';
import { IUser } from '../user/user.interface';

export interface ITask {
  id: string;
  name: string;
  user: IUser;
  project: IProject;
  date: Date;
  duration: number;
}
