import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService as AuthApiService } from '@hc/frontend-data-contracts';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'hc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Username',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        required: true,
      },
    },
  ];

  constructor(private authApiService: AuthApiService, private authService: AuthService, private router: Router) {}

  onSubmit(model: any) {
    this.authApiService
      .login({
        username: model.username,
        password: model.password,
      })
      .subscribe((x) => {
        this.authService.authData$.next(x);
        this.authService.username = model.username;
        this.router.navigate(['']);
      });
  }

  onSubmitRegister(model: any) {
    this.authApiService
      .register({
        username: model.username,
        password: model.password,
      })
      .subscribe((x) => {
        this.authService.authData$.next(x);
        this.authService.username = model.username;
        this.router.navigate(['']);
      });
  }
}
