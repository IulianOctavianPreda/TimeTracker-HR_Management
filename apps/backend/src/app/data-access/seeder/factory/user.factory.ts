import { UserCreate } from '../../../api/dtos/user.dto';
import { UserBase } from '../../../domain/user/user.base';
import { ProjectRepository } from '../../entities/project/project.repository';
import { TeamSettingsRepository } from '../../entities/team-settings/team-settings.repository';
import { TeamRepository } from '../../entities/team/team.repository';
import { UserRepository } from '../../entities/user/user.repository';
import { filterDefinedUniqueEntities } from './factory.base';

export async function createUsers(
  userRepository: UserRepository,
  projectRepository: ProjectRepository,
  teamRepository: TeamRepository,
  teamSettingsRepository: TeamSettingsRepository
) {
  const users: UserCreate[] = [
    { username: 'admin', password: 'admin' },
    { username: 'Ted', password: 'admin' },
    { username: 'Gab', password: 'admin' },
  ];
  return filterDefinedUniqueEntities(userRepository, users, ['username'], async (x) => {
    const user = await userRepository.createUser(x.username, x.password);
    const project = await projectRepository.create({ name: `Project ${x.username}` });
    const team = await teamRepository.createTeam(
      user.id,
      {
        name: `Team ${x.username}`,
      },
      userRepository,
      teamSettingsRepository
    );

    team.users.add(user);
    team.projects.add(project);

    userRepository.persist(user);
    projectRepository.persist(project);
    teamRepository.persist(team);

    return user;
  });
}
