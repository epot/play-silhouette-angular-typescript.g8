import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (this.auth.isAuthenticated()) { return true; }
        console.log('unauthenticated navigating to login');
        this.router.navigateByUrl('/signIn');
        return false;
    }
}
