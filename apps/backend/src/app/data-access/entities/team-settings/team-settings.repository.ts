import { EntityRepository } from '@mikro-orm/postgresql';

import { TeamSettingsEntity } from './team-settings.entity';

export class TeamSettingsRepository extends EntityRepository<TeamSettingsEntity> {}
