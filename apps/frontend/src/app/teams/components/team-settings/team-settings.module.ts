import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { DefaultValuePipeModule } from '../../../directives/default-value/default-value.pipe.module';
import { FormsModule } from '../../../forms/forms.module';
import { IconModule } from '../../../icon/icon.module';
import { TeamSettingsComponent } from './team-settings.component';

@NgModule({
  declarations: [TeamSettingsComponent],
  imports: [CommonModule, IconModule, ButtonModule, FormsModule, DefaultValuePipeModule],
  exports: [TeamSettingsComponent],
})
export class TeamSettingsModule {}
