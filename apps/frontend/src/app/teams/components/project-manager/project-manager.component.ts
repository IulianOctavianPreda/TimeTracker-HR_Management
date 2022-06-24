import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Project, ProjectService, Team, TeamService, User, UserService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { removeDuplicateObjects } from '@shared';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'hc-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss'],
})
export class ProjectManagerComponent implements OnInit {
  icons = PrimeIcons;
  @Input() teams$: BehaviorSubject<Team[]>;
  @Input() teamsForm: FormGroup;
  projects$: Observable<Project[]>;
  allProjects$ = new BehaviorSubject<Project[]>([]);
  projectsForm: FormGroup = new FormGroup({});
  projectsModel = {};
  projectsFields: FormlyFieldConfig[];

  defaultProject = `Project ${this.authService.username}`;

  get selectedTeam() {
    return this.teams$.value.findIndex((x) => {
      return x.id === this.teamsForm.get('team')?.value;
    });
  }

  constructor(
    private projectService: ProjectService,
    public authService: AuthService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.projects$ = this.teams$.pipe(map((x) => x[this.selectedTeam].projects));

    this.projectService
      .getProjects()
      .pipe(take(1))
      .subscribe((projects) => this.allProjects$.next(projects));

    this.projectsFields = [
      {
        key: 'project',
        type: 'select',
        templateOptions: {
          label: 'Assign Project',
          placeholder: 'Choose Project',
          required: false,
          options: this.allProjects$.pipe(
            tap((x) => console.log(x)),
            map((x) => x.map((y) => ({ label: y.name, value: y.id })))
          ),
        },
      },
    ];
  }
  removeProjectFromTeam(projectId: string) {
    const teamId = this.teamsForm.get('team')?.value;
    if (teamId && projectId)
      this.teamService
        .removeProject(teamId, projectId)
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

  addProjectToTeam() {
    const projectId = this.projectsForm.get('project')?.value;
    const teamId = this.teamsForm.get('team')?.value;
    if (teamId && projectId)
      this.teamService
        .addProject(teamId, projectId)
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
}
