import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultValuePipe } from './default-value.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DefaultValuePipe],
  exports: [DefaultValuePipe],
})
export class DefaultValuePipeModule {}
