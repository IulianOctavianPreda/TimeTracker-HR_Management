import { OmitType, PickType } from '@nestjs/swagger';

import { TeamBase } from '../../domain/team/team.base';

export class Team extends OmitType(TeamBase, [] as const) {}
export class TeamCreate extends PickType(TeamBase, ['name'] as const) {}
export class TeamUpdate extends OmitType(TeamBase, ['id'] as const) {}
export class TeamDelete extends PickType(TeamBase, ['id'] as const) {}
