import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FieldTypeConfig } from '../field-type-config';
import { ICalendarTemplateOptions } from './calendar-template-options.interface';

@Component({
  selector: 'hc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CalendarComponent extends FieldTypeConfig<ICalendarTemplateOptions> implements OnInit {
  checkedDates$: BehaviorSubject<Record<number, number[]>> = new BehaviorSubject({});

  constructor() {
    super();
  }

  ngOnInit(): void {
    const date = new Date();
    if (this.to.timeOnly) date.setHours(0, 0, 0, 0);
    this.formControl.patchValue(date);

    let checkedDates: Record<number, number[]> = {};

    console.log(this.to);
    this.to.values?.forEach((val) => {
      checkedDates[val.getMonth()] ??= [];
      checkedDates[val.getMonth()].push(val.getDate());
    });

    this.checkedDates$.next(checkedDates);

    this.to.values$?.subscribe((values) => {
      checkedDates = {};
      values.forEach((val) => {
        checkedDates[val.getMonth()] ??= [];
        checkedDates[val.getMonth()].push(val.getDate());
        console.log(val, checkedDates);
      });

      this.checkedDates$.next(checkedDates);
    });
  }
}
