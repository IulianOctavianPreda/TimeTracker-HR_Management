import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'hc-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavigationBarComponent implements OnInit {
  @ViewChild('contentTemplate') sidebarWrapper: ElementRef;

  icons = PrimeIcons;
  height$ = new BehaviorSubject<number>(170);
  width$ = new BehaviorSubject<number>(170);
  items: MenuItem[];

  expanded = false;

  onShow(ev: any) {
    this.height$.next(this.host.nativeElement.offsetHeight - 25);
    this.width$.next(this.sidebarWrapper.nativeElement.offsetWidth - 20);
  }

  setExpanded(value: boolean) {
    this.expanded = value;
  }

  constructor(public themeService: ThemeService, public host: ElementRef, private authService: AuthService) {
    this.height$.next(this.host.nativeElement.offsetHeight);
    this.width$.next(this.host.nativeElement.offsetWidth);
  }

  ngOnInit() {
    // TODO for mobiles use sidebar component as wrapper and a floating button in the middle of the screen (or maybe drag from left to right to open it)
    // TODO add collapse logic, it should remove the label and resize the width, create service to store and pass in js css variables. use those css variables to control the width
    this.items = [
      {
        label: 'Dashboard',
        routerLink: 'dashboard',
        icon: PrimeIcons.ALIGN_JUSTIFY,
        command: () => {
          this.expanded = false;
        },
      },
      {
        label: 'Teams',
        routerLink: 'teams',
        icon: PrimeIcons.USERS,
        command: () => {
          this.expanded = false;
        },
      },
      {
        label: 'Projects',
        routerLink: 'projects',
        icon: PrimeIcons.USERS,
        command: () => {
          this.expanded = false;
        },
      },

      {
        label: 'Sign Out',
        icon: PrimeIcons.SIGN_OUT,
        routerLink: 'login',
        command: () => {
          this.authService.authData$.next(undefined);
          this.expanded = false;
        },
      },
    ];

    const themeItem = {
      label: 'Theme',
      icon: 'pi pi-fw pi-cog',
      items: [] as MenuItem[],
    };
    this.themeService.availableThemesArr.forEach((theme) => {
      themeItem.items.push({
        label: theme.key,
        command: () => this.themeService.switchTheme(theme.value),
      });
    });

    this.items.push(themeItem);
  }
}
