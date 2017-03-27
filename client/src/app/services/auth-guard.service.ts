import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = AuthService.currentUser();
        if (currentUser === null) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        return true;
    }

    constructor(private router: Router) { }
}
