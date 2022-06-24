import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TeamSettingsModule } from './team-settings/team-settings.module';
import { TeamModule } from './team/team.module';
import { TimeOffModule } from './time-off/time-off.module';
import { UserModule } from './user/user.module';

const modules = [UserModule, AuthModule, TeamModule, TeamSettingsModule, TaskModule, ProjectModule, TimeOffModule];
@Module({
  imports: [...modules],
  controllers: [],
  providers: [...modules],
})
export class BusinessModule {}
