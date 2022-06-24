import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { ProjectEntity } from '../entities/project/project.entity';
import { TaskEntity } from '../entities/task/task.entity';
import { TeamSettingsEntity } from '../entities/team-settings/team-settings.entity';
import { TeamEntity } from '../entities/team/team.entity';
import { UserEntity } from '../entities/user/user.entity';
import { createProjects } from './factory/project.factory';
import { createTasks } from './factory/task.factory';
import { createTeams } from './factory/team.factory';
import { createUsers } from './factory/user.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = await createUsers(
      em.getRepository(UserEntity),
      em.getRepository(ProjectEntity),
      em.getRepository(TeamEntity),
      em.getRepository(TeamSettingsEntity)
    );
    const teams = await createTeams(
      em.getRepository(TeamEntity),
      em.getRepository(TeamSettingsEntity),
      users[0],
      em.getRepository(UserEntity)
    );
    const projects = await createProjects(em.getRepository(ProjectEntity));

    users[0].teams.add(teams[0]);
    teams[0].projects.add(projects[0]);

    const tasks = await createTasks(em.getRepository(TaskEntity), users, projects);

    em.persistAndFlush([...users, ...teams, ...projects, ...tasks]);
  }
}
