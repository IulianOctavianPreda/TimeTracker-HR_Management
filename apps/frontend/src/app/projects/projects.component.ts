import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Project, ProjectCreate, ProjectService, UserService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, debounceTime, filter, map, take } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'hc-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class projectsComponent implements OnInit, AfterViewInit {
  icons = PrimeIcons;

  projects$ = new BehaviorSubject<Project[]>([]);
  projectsForm: FormGroup = new FormGroup({});
  projectsModel = {};
  projectsFields: FormlyFieldConfig[] = [
    {
      key: 'project',
      type: 'select',
      templateOptions: {
        label: 'Project',
        placeholder: 'Choose Project',
        required: false,
        options: this.projects$.pipe(
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
      key: 'newProject',
      type: 'input',
      templateOptions: {
        label: 'Add Project',
        placeholder: 'Ex: C# DevProject',
        required: true,
        type: 'text',
      },
    },
  ];

  userId: string;

  get selectedProject() {
    return this.projects$.value.findIndex((x) => {
      return x.id === this.projectsForm.get('project')?.value;
    });
  }
  get projectId() {
    return this.projects$.value[this.selectedProject].id;
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.authService.authData$.value?.userId) this.userId = this.authService.authData$.value?.userId;

    this.getProjects();
  }

  ngAfterViewInit() {
    this.projects$
      .pipe(
        debounceTime(300),
        filter((x) => !!x && x.length > 0),
        take(1)
      )
      .subscribe((projects) => {
        console.log(projects);
        if (projects[0]?.id) this.projectsForm.patchValue({ project: projects[0].id });
      });
  }

  addProject() {
    const projectName = this.projectsForm.get('newProject')?.value;
    if (projectName) {
      this.projectService
        .createProject({ name: projectName } as ProjectCreate)
        .pipe(take(1))
        .subscribe((project) => {
          const projects = this.projects$.value;
          projects.push(project);
          this.projects$.next(projects);

          this.projectsForm.get('newProject')?.reset();
          this.projectsForm.get('project')?.setValue(project.id);
        });
    }
  }
  removeProject() {
    const projectId = this.projectsForm.get('project')?.value;
    if (projectId) {
      this.projectService
        .deleteProject(projectId)
        .pipe(take(1))
        .subscribe(() => {
          const projects = this.projects$.value;
          projects.splice(
            projects.findIndex((x) => x.id === projectId),
            1
          );
          this.projects$.next(projects);
          if (projects[0]?.id) this.projectsForm.patchValue({ project: projects[0].id });
        });
    }
  }

  getProjects() {
    this.projectService
      .getProjects()
      .pipe(take(1))
      .subscribe((projects) => {
        this.projects$.next(projects);
      });
  }
}
