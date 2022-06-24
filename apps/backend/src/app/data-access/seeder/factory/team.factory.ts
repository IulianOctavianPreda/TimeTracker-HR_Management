import { TeamCreate } from '../../../api/dtos/team.dto';
import { TeamSettingsRepository } from '../../entities/team-settings/team-settings.repository';
import { TeamRepository } from '../../entities/team/team.repository';
import { UserEntity } from '../../entities/user/user.entity';
import { UserRepository } from '../../entities/user/user.repository';
import { filterDefinedUniqueEntities } from './factory.base';

export async function createTeams(
  repository: TeamRepository,
  teamSettingsRepository: TeamSettingsRepository,
  user: UserEntity,
  userRepository: UserRepository
) {
  const teams: TeamCreate[] = [{ name: 'Management' }, { name: 'IT' }, { name: 'Finance' }];
  return filterDefinedUniqueEntities(repository, teams, ['name'], async (x) =>
    repository.createTeam(user.id, x, userRepository, teamSettingsRepository)
  );
}
