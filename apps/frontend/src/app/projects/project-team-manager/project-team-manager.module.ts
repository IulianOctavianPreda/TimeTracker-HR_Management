import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';

import { DefaultValuePipeModule } from '../../directives/default-value/default-value.pipe.module';
import { FormsModule } from '../../forms/forms.module';
import { IconModule } from '../../icon/icon.module';
import { ProjectTeamManagerComponent } from './project-team-manager.component';

@NgModule({
  declarations: [ProjectTeamManagerComponent],
  imports: [CommonModule, TableModule, IconModule, ButtonModule, FormsModule, TabMenuModule, DefaultValuePipeModule],
  exports: [ProjectTeamManagerComponent],
})
export class ProjectTeamManagerModule {}
