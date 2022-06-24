import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';

import { DefaultValuePipeModule } from '../directives/default-value/default-value.pipe.module';
import { FormsModule } from '../forms/forms.module';
import { IconModule } from '../icon/icon.module';
import { ProjectTeamManagerModule } from './project-team-manager/project-team-manager.module';
import { projectsComponent } from './projects.component';

@NgModule({
  declarations: [projectsComponent],
  imports: [
    CommonModule,
    TableModule,
    IconModule,
    ButtonModule,
    FormsModule,
    TabMenuModule,
    DefaultValuePipeModule,
    ProjectTeamManagerModule,
  ],
  exports: [projectsComponent],
})
export class ProjectsModule {}
