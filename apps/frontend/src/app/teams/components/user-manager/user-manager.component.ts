import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Team, TeamService, User, UserService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, filter, map, take } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'hc-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent implements OnInit {
  icons = PrimeIcons;
  @Input() teams$ = new BehaviorSubject<Team[]>([]);
  @Input() teamsForm: FormGroup = new FormGroup({});
  defaultTeam = `Team ${this.authService.username}`;

  users$ = new BehaviorSubject<User[]>([]);
  usersForm: FormGroup = new FormGroup({});
  usersModel = {};
  usersFields: FormlyFieldConfig[] = [
    {
      key: 'user',
      type: 'select',
      templateOptions: {
        label: 'Assign User',
        placeholder: 'Choose User',
        required: false,
        options: this.users$.pipe(
          map((x) =>
            x.map((y) => ({ label: y.username, value: y.id })).filter((y) => y.value !== this.authService.userId)
          )
        ),
      },
    },
  ];

  get selectedTeam() {
    return this.teams$.value.findIndex((x) => {
      return x.id === this.teamsForm.get('team')?.value;
    });
  }

  get selectedTeamData() {
    return this.teams$.value[this.selectedTeam];
  }

  constructor(private userService: UserService, public authService: AuthService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  removeUserFromTeam(userId: string) {
    const teamId = this.teamsForm.get('team')?.value;
    if (teamId && userId)
      this.teamService
        .removeUser(teamId, userId)
        .pipe(take(1))
        .subscribe((team) => {
          const teams = this.teams$.value;
          const idx = teams.findIndex((x) => {
            return x.id === team.id;
          });
          teams.splice(idx, 1, team);
          this.teams$.next(teams);
        });
  }

  addUserToTeam() {
    const userId = this.usersForm.get('user')?.value;
    const teamId = this.teamsForm.get('team')?.value;
    if (teamId && userId)
      this.teamService
        .addUser(teamId, userId)
        .pipe(take(1))
        .subscribe((team) => {
          const teams = this.teams$.value;
          const idx = teams.findIndex((x) => {
            return x.id === team.id;
          });
          teams.splice(idx, 1, team);
          this.teams$.next(teams);
        });
  }
  getUsers() {
    this.userService
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.users$.next(users);
      });
  }
}
