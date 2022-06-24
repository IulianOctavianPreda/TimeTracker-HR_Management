import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '@hc/frontend-data-contracts';
import { isToday, removeDuplicateObjects } from '@shared';
import { PrimeIcons } from 'primeng/api';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'hc-dashboard-activity',
  templateUrl: './dashboard-activity.component.html',
  styleUrls: ['./dashboard-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardActivityComponent implements OnInit {
  icons = PrimeIcons;

  timeOffToday: { name?: string; duration?: number; reason?: string }[] = [];
  dayData: any;
  weekData: any;
  monthData: any;
  createChartData(value: number, label: string) {
    return {
      labels: [label + ' - Work done', 'Work left'],
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    };
  }

  constructor(private userService: UserService, private authService: AuthService) {}
  ngOnInit() {
    const userId = this.authService.authData$.value?.userId;
    if (userId) {
      this.userService.getAmountOfWorkDone(userId).subscribe((workDone) => {
        this.dayData = this.createChartData(workDone.todayPercentage, 'Day');
        this.weekData = this.createChartData(workDone.weekPercentage, 'Week');
        this.monthData = this.createChartData(workDone.monthPercentage, 'Month');
      });

      this.userService.getAwayMembers(userId).subscribe((awayMembers) => {
        console.log(awayMembers);
        this.timeOffToday.push(
          ...new Set(
            removeDuplicateObjects(awayMembers).map((x) => {
              const timeOffToday = x.timeOffs.filter((x) => isToday(new Date(x.startDate)));

              return {
                name: x.username,
                duration: timeOffToday.reduce((acc, curr) => (acc += curr.duration ?? 0), 0),
                reason: timeOffToday.map((x) => x.reason).join(', '),
              };
            })
          )
        );
      });
    }
  }
}
