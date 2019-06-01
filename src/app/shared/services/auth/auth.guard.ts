import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GlobalService} from '../global.service';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private svcGlobal: GlobalService,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      const loggedInUser = this.svcGlobal.getSession('loggedInUser');
      this.authService.loadPermissionsBasedOnLoggedInUser(loggedInUser);
      return true;
    }
    this.router.navigate(['/sessions/signin']);
    return false;
  }
}
