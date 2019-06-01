import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {TokensService} from './tokens.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {GlobalService} from '../global.service';
import {LogsService} from '../logs.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(public tokensService: TokensService,
              private router: Router,
              private logsService: LogsService,
              private globaleService: GlobalService) {
  }

  intercept(requ: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (requ.url.indexOf('assets/globals.json') === -1 && requ.url.indexOf('assets/i18n/') === -1) {
      this.logsService.setLog('AuthInterceptor', 'Http Request', requ);
      const token = this.tokensService.getToken();
      const refreshtoken = this.tokensService.getRefreshToken();
      if (token != null && refreshtoken != null) {
        requ = requ.clone({headers: requ.headers.set(this.tokensService.tokenName, token)});
        requ = requ.clone({headers: requ.headers.set(this.tokensService.refreshTokenName, refreshtoken)});
      }
      return next.handle(requ).pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this.logsService.setLog('AuthInterceptor', 'Http Response', event);
          if (event.headers.get(this.tokensService.tokenName) != null && event.headers.get(this.tokensService.refreshTokenName) != null) {
            this.globaleService.setSession(this.tokensService.tokenName, event.headers.get(this.tokensService.tokenName));
            this.globaleService.setSession(this.tokensService.refreshTokenName, event.headers.get(this.tokensService.refreshTokenName));
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.logsService.setLog('AuthInterceptor', 'Error', err);
          if (err.status === 500) {
            localStorage.setItem(btoa('error'), JSON.stringify(err.error.description));
            this.router.navigate(['/sessions/error']);
          } else if (err.status === 404) {
            this.router.navigate(['/sessions/404']);
          } else if (err.status === 401) {
            localStorage.setItem(btoa('error'), JSON.stringify(err.error.description));
            this.router.navigate(['/sessions/signin']);
          } else if (err.status === 403) {
            this.router.navigate(['/sessions/accessDenied']);
          } else {
            this.router.navigate(['/sessions/error']);
          }
        }
      }));
    } else {
      return next.handle(requ).pipe(tap(event => {
        if (event instanceof HttpResponse) {
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
        }
      }));
    }
  }
}

// if (error instanceof HttpErrorResponse) {
//   if (error.status === 401) {
//     // JWT expired, go to login
//     // Observable.throw(err);
//   }
// }
