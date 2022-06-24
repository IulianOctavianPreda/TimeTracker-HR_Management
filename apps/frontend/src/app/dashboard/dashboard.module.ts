import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';

import { DefaultValuePipeModule } from '../directives/default-value/default-value.pipe.module';
import { TimeDurationPipeModule } from '../directives/time-duration/time-duration.pipe.module';
import { FormsModule } from '../forms/forms.module';
import { IconModule } from '../icon/icon.module';
import { DashboardActivityComponent } from './components/dashboard-activity/dashboard-activity.component';
import { TimeOffComponent } from './components/time-off/time-off.component';
import { TimeTrackerComponent } from './components/time-tracker/time-tracker.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabMenuModule,
    ButtonModule,
    TableModule,
    TimeDurationPipeModule,
    CalendarModule,
    DefaultValuePipeModule,
    IconModule,
    ChartModule,
  ],
  declarations: [DashboardComponent, TimeTrackerComponent, TimeOffComponent, DashboardActivityComponent],
  exports: [DashboardComponent, TimeTrackerComponent, TimeOffComponent, DashboardActivityComponent],
})
export class DashboardModule {}
