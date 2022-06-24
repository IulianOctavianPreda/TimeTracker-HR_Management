import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TimeDurationPipe } from './time-duration.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TimeDurationPipe],
  exports: [TimeDurationPipe],
})
export class TimeDurationPipeModule {}
