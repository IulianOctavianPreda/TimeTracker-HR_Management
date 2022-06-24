import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Project, ProjectService, Team, TeamService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, map, take } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'hc-project-team-manager',
  templateUrl: './project-team-manager.component.html',
  styleUrls: ['./project-team-manager.component.scss'],
})
export class ProjectTeamManagerComponent implements OnInit {
  icons = PrimeIcons;
  @Input() projects$ = new BehaviorSubject<Project[]>([]);
  @Input() projectsForm: FormGroup = new FormGroup({});
  defaultProject = `Project ${this.authService.username}`;
  defaultTeam = `Team ${this.authService.username}`;

  teams$ = new BehaviorSubject<Team[]>([]);
  teamsForm: FormGroup = new FormGroup({});
  teamsModel = {};
  teamsFields: FormlyFieldConfig[] = [
    {
      key: 'team',
      type: 'select',
      templateOptions: {
        label: 'Assign Team',
        placeholder: 'Choose Team',
        required: false,
        options: this.teams$.pipe(
          map((x) =>
            x.filter((x) => x.teamAdmin?.id === this.authService.userId).map((y) => ({ label: y.name, value: y.id }))
          )
        ),
      },
    },
  ];

  get selectedProject() {
    return this.projects$.value.findIndex((x) => {
      return x.id === this.projectsForm.get('project')?.value;
    });
  }

  constructor(
    private teamService: TeamService,
    public authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getTeams();
  }
  removeTeamFromProject(teamId: string) {
    const projectId = this.projectsForm.get('project')?.value;
    if (projectId && teamId)
      this.projectService
        .removeTeam(projectId, teamId)
        .pipe(take(1))
        .subscribe((project) => {
          const projects = this.projects$.value;
          const idx = projects.findIndex((x) => {
            return x.id === project.id;
          });
          projects.splice(idx, 1, project);
          this.projects$.next(projects);
        });
  }

  addTeamToProject() {
    const teamId = this.teamsForm.get('team')?.value;
    const projectId = this.projectsForm.get('project')?.value;
    if (projectId && teamId)
      this.projectService
        .addTeam(projectId, teamId)
        .pipe(take(1))
        .subscribe((project) => {
          const projects = this.projects$.value;
          const idx = projects.findIndex((x) => {
            return x.id === project.id;
          });
          projects.splice(idx, 1, project);
          this.projects$.next(projects);
        });
  }
  getTeams() {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        this.teams$.next(teams);
      });
  }
}
