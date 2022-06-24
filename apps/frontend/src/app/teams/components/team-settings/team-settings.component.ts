import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamSettings, TeamSettingsService, TeamSettingsUpdate } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PrimeIcons } from 'primeng/api';
import { take } from 'rxjs';

@Component({
  selector: 'hc-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss'],
})
export class TeamSettingsComponent implements OnChanges, AfterViewInit {
  icons = PrimeIcons;
  @Input() teamSettings?: TeamSettings;

  form: FormGroup = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'workHours',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Work hours',
        placeholder: 'Work hours',
      },
    },

    {
      key: 'weekDays',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Work days',
        placeholder: 'Work days',
      },
    },
  ];

  constructor(private teamSettingsService: TeamSettingsService) {}

  ngAfterViewInit(): void {
    if (this.teamSettings) this.form.patchValue(this.teamSettings);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['teamSettings']) {
      if (this.teamSettings) this.form.patchValue(this.teamSettings);
    }
  }

  onSave() {
    const value = this.form.value;
    if (!this.form.valid) return;
    console.log(this.teamSettings);

    const teamSettings: TeamSettingsUpdate = { ...value, id: this.teamSettings?.id };
    this.teamSettingsService
      .updateTeamSettings(teamSettings)
      .pipe(take(1))
      .subscribe((x) => {
        if (this.teamSettings) Object.assign(this.teamSettings, x);
      });
  }
}
