import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Team, TeamService } from '@hc/frontend-data-contracts';
import { TimeOff } from 'libs/frontend/data-contracts/src/lib/model/time-off';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, map, take, timeout } from 'rxjs';
import { FullCalendarComponent, CalendarApi } from '@fullcalendar/angular';

@Component({
  selector: 'hc-time-off-calendar',
  templateUrl: './time-off-calendar.component.html',
  styleUrls: ['./time-off-calendar.component.scss'],
})
export class TimeOffCalendarComponent implements OnChanges, AfterViewInit {
  @ViewChild(FullCalendarComponent) calendar: FullCalendarComponent;
  @Input() teamId: string;

  icons = PrimeIcons;
  calendarApi: CalendarApi;

  timeOffs$ = new BehaviorSubject<TimeOff[]>([]);

  header: any;

  options = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    aspectRatio: 2,
  };
  constructor(private teamService: TeamService, private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.calendarApi = this.calendar.getApi();
    this.getTimeOffs();
    this.updateTimeOffs();
    console.log(this.calendarApi.getCurrentData());
  }

  ngOnChanges(): void {
    this.getTimeOffs();
    this.updateTimeOffs();
  }

  private updateTimeOffs() {
    if (this.calendarApi) {
      this.calendarApi.removeAllEvents();
      this.timeOffs$.pipe(take(1)).subscribe((x) =>
        x.forEach((y) => {
          this.calendarApi.addEvent({
            title: y.user.username,
            start: y.startDate,
            end: y.endDate,
          });
        })
      );
    }
  }

  getTimeOffs() {
    this.teamService.getTeamTimeOff(this.teamId).subscribe((x) => this.timeOffs$.next(x));
  }
}
