import { EntityRepository } from '@mikro-orm/postgresql';

import { ProjectEntity } from './project.entity';

export class ProjectRepository extends EntityRepository<ProjectEntity> {}
