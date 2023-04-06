import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
  }

  login() {
    this.isLoggedIn$.next(true)
    this.router.navigateByUrl('dashboard')
  }

  logout() {
    this.isLoggedIn$.next(false)
    this.router.navigateByUrl('')
  }
}
