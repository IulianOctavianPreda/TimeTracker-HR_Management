import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Project, Task, TaskCreate, TaskService, Team, User, UserService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, map } from 'rxjs';
import * as XLSX from 'xlsx';

import { AuthService } from '../../../auth/auth.service';
import { createCalendar } from '../../../forms/form-type.generator';

@Component({
  selector: 'hc-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TimeTrackerComponent implements OnInit {
  icons = PrimeIcons;
  user: User;

  teams$ = new BehaviorSubject<Team[]>([]);
  projects$ = new BehaviorSubject<Project[]>([]);
  tasks$ = new BehaviorSubject<Task[]>([]);

  sortedTasks$ = this.tasks$.pipe(
    map((tasks) => tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  );

  form: FormGroup = new FormGroup({});
  model = {};

  fields: FormlyFieldConfig[] = [
    createCalendar('date', {
      label: 'Date',
      placeholder: 'Date',
      required: true,
      values$: this.tasks$.pipe(map((x) => x.map((y) => new Date(y.date)))),
      inline: false,
    }),
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Name',
        required: true,
      },
    },
    {
      key: 'project',
      type: 'select',
      templateOptions: {
        label: 'Project',
        placeholder: 'Project',
        required: false,
        options: this.projects$.pipe(map((x) => x.map((y) => ({ label: y.name, value: y.id })))),
      },
    },
    createCalendar('duration', {
      label: 'Duration',
      placeholder: 'duration',
      required: true,
      inline: false,
      showTime: true,
      timeOnly: true,
    }),
  ];

  constructor(private userService: UserService, private authService: AuthService, private taskService: TaskService) {}
  ngOnInit() {
    const id = this.authService.authData$.value?.userId;

    if (id) {
      console.log(this.authService.authData$.value, id);
      this.userService.getUser(id).subscribe((x) => {
        this.user = x;
        this.tasks$.next(x.tasks);
      });

      this.userService.getUserTeams(id).subscribe((teams) => {
        console.log(teams);
        this.projects$.next(teams.map((x) => x.projects).flat());
      });
    }
  }

  removeEntry(task: Task) {
    this.taskService.deleteTask({ id: task.id }).subscribe((tasks) => {
      this.tasks$.next(tasks);
    });
  }

  onSave() {
    if (this.form.invalid) return;
    const value = this.form.value;

    const duration = (value.duration as Date) ?? new Date();
    const task: TaskCreate = {
      name: value.name,
      date: value.date ?? new Date(),
      duration: duration.getHours() * 3600000 + duration.getMinutes() * 60000 + duration.getSeconds() * 1000,
      userId: this.user.id,
      projectId: value.project,
    };

    this.save(task);
  }

  save(task: TaskCreate) {
    this.taskService.createTask(task).subscribe((tasks) => {
      this.tasks$.next(tasks);
    });
  }

  exportExcel(): void {
    /* pass here the table id */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'timesheet.xlsx');
  }
}
