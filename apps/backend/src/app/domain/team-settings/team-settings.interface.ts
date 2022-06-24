import { ITeam } from '../team/team.interface';

export interface ITeamSettings {
  id: string;
  workHours: number;
  weekDays: number;
  team: ITeam;
}
