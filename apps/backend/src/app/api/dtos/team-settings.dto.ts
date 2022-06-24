import { OmitType } from '@nestjs/swagger';

import { TeamSettingsBase } from '../../domain/team-settings/team-setting.base';

export class TeamSettings extends OmitType(TeamSettingsBase, [] as const) {}
export class TeamSettingsUpdate extends OmitType(TeamSettingsBase, ['team'] as const) {}
