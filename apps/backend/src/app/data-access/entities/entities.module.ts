import { Global, Module } from '@nestjs/common';

import { ProjectEntityModule } from './project/project.entity.module';
import { TaskEntityModule } from './task/task.entity.module';
import { TeamSettingsEntityModule } from './team-settings/team-settings.entity.module';
import { TeamEntityModule } from './team/team.entity.module';
import { TimeOffEntityModule } from './time-off/time-off.entity.module';
import { UserEntityModule } from './user/user.entity.module';

const modules = [UserEntityModule, TeamEntityModule, TeamSettingsEntityModule, ProjectEntityModule, TaskEntityModule, TimeOffEntityModule];

@Global()
@Module({
  imports: [...modules],
  controllers: [],
  providers: [],
  exports: [...modules],
})
export class EntitiesModule {}
