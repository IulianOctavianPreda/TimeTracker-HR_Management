import { EntityRepository } from '@mikro-orm/postgresql';

import { TeamCreate } from '../../../api/dtos/team.dto';
import { TeamSettingsRepository } from '../team-settings/team-settings.repository';
import { UserRepository } from '../user/user.repository';
import { TeamEntity } from './team.entity';

export class TeamRepository extends EntityRepository<TeamEntity> {
  async createTeam(
    userId: string,
    data: TeamCreate,
    userRepository: UserRepository,
    teamSettingsRepository: TeamSettingsRepository
  ): Promise<TeamEntity> {
    const team = this.create(data);
    const teamSettings = teamSettingsRepository.create({ team, workHours: 8, weekDays: 5 });
    team.teamSettings = teamSettings;
    team.teamAdmin = (await userRepository.findOne({ id: userId })) ?? undefined;

    await this.persistAndFlush(team);
    return team;
  }
}
