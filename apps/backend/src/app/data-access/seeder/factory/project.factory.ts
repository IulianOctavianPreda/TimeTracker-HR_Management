import { ProjectCreate } from '../../../api/dtos/project.dto';
import { ProjectRepository } from '../../entities/project/project.repository';
import { filterDefinedUniqueEntities } from './factory.base';

export async function createProjects(repository: ProjectRepository) {
  const projects: ProjectCreate[] = [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }, { name: 'Delta' }];
  return filterDefinedUniqueEntities(repository, projects, ['name'], async (x) => repository.create(x));
}
