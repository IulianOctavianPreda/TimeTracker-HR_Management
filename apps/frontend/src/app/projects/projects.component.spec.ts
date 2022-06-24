import { ComponentFixture, TestBed } from '@angular/core/testing';

import { projectsComponent } from './projects.component';

describe('projectsComponent', () => {
  let component: projectsComponent;
  let fixture: ComponentFixture<projectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [projectsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(projectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
