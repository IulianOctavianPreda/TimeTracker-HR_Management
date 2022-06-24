import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { CalendarModule } from 'primeng/calendar';

import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    FormlyModule.forRoot({
      types: [
        { name: 'calendar', component: CalendarComponent, wrappers: ['form-field'] },
        { name: 'inline-calendar', component: CalendarComponent, wrappers: [] },
      ],
    }),
    CalendarModule,
  ],
  providers: [],
  exports: [ReactiveFormsModule, FormlyModule],
})
export class FormsModule {}
