import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';

import { DefaultValuePipeModule } from '../directives/default-value/default-value.pipe.module';
import { FormsModule } from '../forms/forms.module';
import { IconModule } from '../icon/icon.module';
import { ProjectManagerModule } from './components/project-manager/project-manager.module';
import { TeamSettingsModule } from './components/team-settings/team-settings.module';
import { TimeOffCalendarComponent } from './components/time-off-calendar/time-off-calendar.component';
import { UserManagerModule } from './components/user-manager/user-manager.module';
import { TeamsComponent } from './teams.component';

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, interactionPlugin]);

@NgModule({
  declarations: [TeamsComponent, TimeOffCalendarComponent],
  imports: [
    CommonModule,
    TableModule,
    IconModule,
    ButtonModule,
    FormsModule,
    TabMenuModule,
    DefaultValuePipeModule,
    UserManagerModule,
    ProjectManagerModule,
    FullCalendarModule,
    TeamSettingsModule,
  ],
  exports: [TeamsComponent],
})
export class TeamsModule {}
