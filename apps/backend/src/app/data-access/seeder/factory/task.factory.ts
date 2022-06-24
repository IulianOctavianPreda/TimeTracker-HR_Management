import { TaskCreate } from '../../../api/dtos/task.dto';
import { ProjectEntity } from '../../entities/project/project.entity';
import { TaskEntity } from '../../entities/task/task.entity';
import { TaskRepository } from '../../entities/task/task.repository';
import { UserEntity } from '../../entities/user/user.entity';
import { filterDefinedUniqueEntities } from './factory.base';

export async function createTasks(repository: TaskRepository, users: UserEntity[], projects: ProjectEntity[]) {
  const currentDate = new Date();
  const yesterdayDate = new Date(new Date().setDate(currentDate.getDate() - 1));
  const tasks: TaskCreate[] = [
    { name: 'Reporting', userId: users[0].id, projectId: projects[0].id, date: currentDate, duration: 10000000 },
    { name: 'Emails', userId: users[0].id, projectId: projects[0].id, date: currentDate, duration: 10000000 },
    { name: 'Sprint Review', userId: users[0].id, projectId: projects[0].id, date: currentDate, duration: 10000000 },
    { name: 'Coding', userId: users[0].id, projectId: projects[0].id, date: yesterdayDate, duration: 28800000 },
  ];
  return filterDefinedUniqueEntities(repository, tasks, ['name'], async (x): Promise<TaskEntity> => {
    return repository.create({
      ...x,
      user: users.find((u) => u.id === x.userId) ?? users[0],
      project: projects.find((u) => u.id === x.projectId) ?? projects[0],
    });
  });
}
