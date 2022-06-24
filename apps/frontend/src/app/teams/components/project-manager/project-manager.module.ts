import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagerComponent } from './project-manager.component';
import { FormsModule } from '../../../forms/forms.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { DefaultValuePipeModule } from '../../../directives/default-value/default-value.pipe.module';
import { IconModule } from '../../../icon/icon.module';

@NgModule({
  declarations: [ProjectManagerComponent],
  imports: [CommonModule, TableModule, IconModule, ButtonModule, FormsModule, TabMenuModule, DefaultValuePipeModule],
  exports: [ProjectManagerComponent],
})
export class ProjectManagerModule {}
