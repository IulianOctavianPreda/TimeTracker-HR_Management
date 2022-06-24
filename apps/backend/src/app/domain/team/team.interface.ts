import { Collection } from '@mikro-orm/core';

import { IProject } from '../project/project.interface';
import { ITeamSettings } from '../team-settings/team-settings.interface';
import { IUser } from '../user/user.interface';

export interface ITeam {
  id: string;
  name: string;
  users: Array<IUser> | Collection<IUser>;
  projects: Array<IProject> | Collection<IProject>;
  teamSettings?: ITeamSettings;
  teamAdmin?: IUser;
}
