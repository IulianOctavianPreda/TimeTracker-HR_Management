import { OmitType, PickType } from '@nestjs/swagger';

import { ProjectBase } from '../../domain/project/project.base';

export class Project extends OmitType(ProjectBase, [] as const) {}
export class ProjectCreate extends PickType(ProjectBase, ['name'] as const) {}
export class ProjectUpdate extends OmitType(ProjectBase, ['id'] as const) {}
export class ProjectDelete extends PickType(ProjectBase, ['id'] as const) {}
