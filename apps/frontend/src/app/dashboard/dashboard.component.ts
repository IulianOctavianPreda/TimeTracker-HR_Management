import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'hc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardComponent implements OnInit {
  icons = PrimeIcons;
  items: MenuItem[];
  activeItem: MenuItem;

  setActiveItem(id: string) {
    this.activeItem = this.items.find((x) => x.id === id) ?? this.items[0];
  }

  constructor() {}
  ngOnInit() {
    this.items = [
      {
        label: 'Activity',
        icon: PrimeIcons.PERCENTAGE,
        id: 'dashboard-activity',
        command: () => this.setActiveItem('dashboard-activity'),
      },
      {
        label: 'Time Tracking',
        icon: PrimeIcons.USER,
        id: 'time-tracking',
        command: () => this.setActiveItem('time-tracking'),
      },
      {
        label: 'Time Off',
        icon: PrimeIcons.USERS,
        id: 'time-off',
        command: () => this.setActiveItem('time-off'),
      },
    ];

    this.activeItem = this.items[0];
  }
}
