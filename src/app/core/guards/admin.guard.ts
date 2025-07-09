import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService)
  const _router = inject(Router)
  if(_authS.getToken() && _authS.getRole() === 'admin'){
    return true;
  }else {
    // _router.navigate(['/login']);
     return _router.createUrlTree(['/login'], {
      queryParams: { returnurl: state.url }
    });
  }
};
