import { Injectable } from '@angular/core';
import { JwtAuth, User } from '@hc/frontend-data-contracts';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authData$ = new BehaviorSubject<JwtAuth | undefined>(undefined);
  username: User['username'];
  userId: User['id'];
  constructor() {
    this.authData$.pipe(filter((x): x is JwtAuth => !!x)).subscribe((x) => {
      this.userId = x.userId;
    });
  }
}
