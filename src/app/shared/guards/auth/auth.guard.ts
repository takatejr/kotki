import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

export const AuthGuard = () => {
  const router = inject(Router);
  const service = inject(AuthService)

  return service.isLoggedIn$.pipe(
    map((value) => {
        return !value ? router.navigate(['/login']) : true
      }
    ))
}
