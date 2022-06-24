import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TimeOff, TimeOffCreate, TimeOffService, User, UserService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, map } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';
import { createCalendar } from '../../../forms/form-type.generator';

@Component({
  selector: 'hc-time-off',
  templateUrl: './time-off.component.html',
  styleUrls: ['./time-off.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TimeOffComponent implements OnInit {
  icons = PrimeIcons;
  user: User;
  timeOffs$ = new BehaviorSubject<TimeOff[]>([]);

  form: FormGroup = new FormGroup({});
  model = {};

  fields: FormlyFieldConfig[] = [
    createCalendar('startDate', {
      label: 'Start date',
      placeholder: 'Start date',
      required: true,
      values$: this.timeOffs$.pipe(map((x) => x.map((y) => new Date(y.startDate)))),
      inline: false,
    }),
    createCalendar('endDate', {
      label: 'End date',
      placeholder: 'End date',
      required: true,
      values$: this.timeOffs$.pipe(map((x) => x.map((y) => new Date(y.endDate)))),
      inline: false,
    }),
    createCalendar('duration', {
      label: 'Duration',
      placeholder: 'duration',
      required: true,
      inline: false,
      showTime: true,
      timeOnly: true,
    }),
    {
      key: 'reason',
      type: 'input',
      templateOptions: {
        label: 'Reason',
        placeholder: 'Reason',
        required: true,
      },
    },
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private timeOffService: TimeOffService
  ) {}
  ngOnInit() {
    const id = this.authService.authData$.value?.userId;

    if (id) {
      console.log(this.authService.authData$.value, id);
      this.userService.getUser(id).subscribe((x) => {
        this.user = x;
        this.timeOffs$.next(x.timeOffs);
      });
    }
  }

  removeEntry(timeOff: TimeOff) {
    this.timeOffService.deleteTimeOff({ id: timeOff.id }).subscribe((timeOffs) => {
      this.timeOffs$.next(timeOffs);
    });
  }

  onSave() {
    if (this.form.invalid) return;
    const value = this.form.value;
    console.log(this.form.value);
    const duration = (value.duration as Date) ?? new Date();
    const timeOff: TimeOffCreate = {
      userId: this.user.id,
      reason: value.reason,
      startDate: value.startDate ?? new Date(),
      endDate: value.endDate ?? new Date(),
      duration: duration.getHours() * 3600000 + duration.getMinutes() * 60000 + duration.getSeconds() * 1000,
    };

    this.save(timeOff);
  }

  save(timeOff: TimeOffCreate) {
    this.timeOffService.createTimeOff(timeOff).subscribe((timeOffs) => {
      this.timeOffs$.next(timeOffs);
    });
  }
}
