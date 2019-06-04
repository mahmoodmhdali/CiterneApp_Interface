import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global.service';
import {TokensService} from './tokens.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {UserProfileModel} from '../../models/UserProfile.model';
import {LogsService} from '../logs.service';

@Injectable()
export class AuthService {
  apiConfig;
  responseCodeConfig;
  tokensConfig;

  constructor (private router: Router,
               private httpClient: HttpClient,
               private ngxPermissionsService: NgxPermissionsService,
               private svcGlobal: GlobalService,
               private logsService: LogsService,
               private tokensService: TokensService) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
    this.responseCodeConfig = this.svcGlobal.getSession('RESPONSE_CODE');
    this.tokensConfig = this.svcGlobal.getSession('TOKENS_CONFIG');
  }

  signUpUser (email: string, password: string) {
  }

  signInUser (email: string, password: string, rememberMe: boolean) {
    const userCredentials = {'email': email, 'password': password, 'rememberMe': rememberMe};
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/login', JSON.stringify(userCredentials));
  }

  signOut () {
    this.tokensService.clearTokens();
    this.router.navigate(['/sessions/signin']);
  }

  signOutWithoutRedirect () {
    this.tokensService.clearTokens();
  }

  isAuthenticated () {
    return this.tokensService.isTokentExpired();
  }

  loadPermissionsBasedOnLoggedInUser (userProfile: UserProfileModel) {
    const permissions = [];
    for (const group of userProfile.groupCollection) {
      for (const role of group.roleCollection) {
        if (! permissions.includes(role.role)) {
          permissions.push(role.role);
        }
      }
    }
    this.logsService.setLog('AuthService', 'loadPermissionsBasedOnLoggedInUser', userProfile);
    this.ngxPermissionsService.loadPermissions(permissions, (permissionName, permissionStore) => {
      return ! ! permissionStore[permissionName];
    });
  }

  navigationBasedOnRoles () {
    this.router.navigate(['/events']);
    // if (typeof this.ngxPermissionsService.getPermission('OUTLET') !== 'undefined') {
    //   this.router.navigate(['/profile']);
    // } else if (typeof this.ngxPermissionsService.getPermission('SYSTEM') !== 'undefined') {
    //   this.router.navigate(['/systemUsers']);
    // } else if (typeof this.ngxPermissionsService.getPermission('OUR_SYSTEM_USER') !== 'undefined') {
    //   this.router.navigate(['/systemUsers']);
    // } else {
    //   this.router.navigate(['/users']);
    // }
    this.logsService.setLog('AuthService', 'navigationBasedOnRoles', this.ngxPermissionsService.getPermissions());
  }

}
