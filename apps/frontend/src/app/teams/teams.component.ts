import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Project, Team, TeamCreate, TeamService, User, UserService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BehaviorSubject, debounceTime, filter, map, take } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'hc-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, AfterViewInit {
  icons = PrimeIcons;
  activeItem: MenuItem;
  menuTabs = [
    {
      label: 'Users',
      icon: PrimeIcons.USER_EDIT,
      id: 'users',
      command: () => {
        this.setActiveItem('users');
      },
    },
    {
      label: 'Projects',
      icon: PrimeIcons.COMPASS,
      id: 'projects',
      command: () => {
        this.setActiveItem('projects');
      },
    },
    {
      label: 'Time-off',
      icon: PrimeIcons.CLOCK,
      id: 'time-off',
      command: () => {
        this.setActiveItem('time-off');
      },
    },
  ];
  adminMenuTabs = [
    ...this.menuTabs,
    {
      label: 'Team-settings',
      icon: PrimeIcons.COG,
      id: 'team-settings',
      command: () => {
        this.setActiveItem('team-settings');
      },
    },
  ];
  teams$ = new BehaviorSubject<Team[]>([]);
  teamsForm: FormGroup = new FormGroup({});
  teamsModel = {};
  teamsFields: FormlyFieldConfig[] = [
    {
      key: 'team',
      type: 'select',
      templateOptions: {
        label: 'Team',
        placeholder: 'Choose Team',
        required: false,
        options: this.teams$.pipe(
          map((x) =>
            x.map((y) => {
              //const group = y.users.map((u) => u.id).includes(this.userId) ? 'P' : 'O';
              return { label: y.name, value: y.id };
            })
          )
        ),
      },
    },
    {
      key: 'newTeam',
      type: 'input',
      templateOptions: {
        label: 'Add Team',
        placeholder: 'Ex: C# DevTeam',
        required: true,
        type: 'text',
      },
    },
  ];

  userId: string;

  get selectedTeam() {
    return this.teams$.value.findIndex((x) => {
      return x.id === this.teamsForm.get('team')?.value;
    });
  }

  get teamId() {
    return this.teams$.value[this.selectedTeam].id;
  }

  constructor(private userService: UserService, public authService: AuthService, private teamService: TeamService) {}

  ngOnInit(): void {
    if (this.authService.authData$.value?.userId) this.userId = this.authService.authData$.value?.userId;

    this.getTeams();
    this.activeItem = this.menuTabs[0];
  }

  ngAfterViewInit() {
    this.teams$
      .pipe(
        debounceTime(300),
        filter((x) => !!x && x.length > 0),
        take(1)
      )
      .subscribe((teams) => {
        if (teams[0]?.id) this.teamsForm.patchValue({ team: teams[0].id });
      });
  }

  addTeam() {
    const teamName = this.teamsForm.get('newTeam')?.value;
    if (teamName) {
      this.teamService
        .createTeam(this.userId, { name: teamName } as TeamCreate)
        .pipe(take(1))
        .subscribe((team) => {
          const teams = this.teams$.value;
          teams.push(team);
          this.teams$.next(teams);
          this.teamsForm.get('newTeam')?.reset();
          this.teamsForm.get('team')?.setValue(team.id);
        });
    }
  }
  removeTeam() {
    const teamId = this.teamsForm.get('team')?.value;
    if (teamId) {
      this.teamService
        .deleteTeam(teamId)
        .pipe(take(1))
        .subscribe(() => {
          console.log('x');
          const teams = this.teams$.value;
          teams.splice(
            teams.findIndex((x) => x.id === teamId),
            1
          );
          this.teams$.next(teams);
          if (teams[0]?.id) this.teamsForm.patchValue({ team: teams[0].id });
        });
    }
  }

  getTeams() {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        this.teams$.next(teams);
      });
  }

  setActiveItem(id: string) {
    this.activeItem = this.adminMenuTabs.find((x) => x.id === id) ?? this.menuTabs[0];
  }
}
