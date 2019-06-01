import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {JwtHelper} from 'angular2-jwt';
import {LogsService} from '../logs.service';

@Injectable()
export class TokensService {
  tokenName: string;
  refreshTokenName: string;
  tokensConfig;
  jwtHelper: JwtHelper = new JwtHelper();
  settersDone = false;

  constructor(private svcGlobal: GlobalService, private logsService: LogsService) {
    this.setTokensNames();
  }

  setTokensNames() {
    if (!this.settersDone) {
      this.tokensConfig = this.svcGlobal.getSession('TOKENS_CONFIG');
      if (this.tokensConfig != null) {
        this.tokenName = this.tokensConfig.TOKEN_NAME;
        this.refreshTokenName = this.tokensConfig.REFRESH_TOKEN_NAME;
        this.settersDone = true;
      }
    }
  }

  setToken(value: string) {
    this.setTokensNames();
    if (this.tokenName != null) {
      this.svcGlobal.setSession(this.tokenName, value);
    }
  }

  setRefreshToken(value: string) {
    this.setTokensNames();
    if (this.refreshTokenName != null) {
      this.svcGlobal.setSession(this.refreshTokenName, value);
    }
  }

  getToken() {
    this.setTokensNames();
    if (this.tokenName != null) {
      return this.svcGlobal.getSession(this.tokenName);
    }
    return null;
  }

  getRefreshToken() {
    this.setTokensNames();
    if (this.refreshTokenName != null) {
      return this.svcGlobal.getSession(this.refreshTokenName);
    }
    return null;
  }

  getTokenValidity() {
    this.setTokensNames();
    if (this.getToken() != null) {
      return this.jwtHelper.getTokenExpirationDate(this.getToken());
    }
    return null;
  }

  getRefreshTokenValidity() {
    this.setTokensNames();
    if (this.getRefreshToken() != null) {
      return this.jwtHelper.getTokenExpirationDate(this.getRefreshToken());
    }
    return null;
  }

  // isTokentExpired() {
  //   this.logsService.setLog('TokensService', 'isTokentExpired', this.getToken());
  //   this.logsService.setLog('TokensService', 'isTokentExpired', this.getRefreshToken());
  //   this.logsService.setLog('TokensService', 'isTokentExpired', this.svcGlobal.getSession('loggedInUser'));
  //   if ((this.getToken() && this.getRefreshToken() && this.svcGlobal.getSession('loggedInUser')) != null) {
  //     if ((this.jwtHelper.isTokenExpired(this.getToken()) && this.jwtHelper.isTokenExpired(this.getRefreshToken())) === false) {
  //       return true;
  //     }
  //     this.logsService.setLog('TokensService', 'isTokentExpired', this.jwtHelper.isTokenExpired(this.getToken()));
  //     this.logsService.setLog('TokensService', 'isTokentExpired', this.jwtHelper.isTokenExpired(this.getRefreshToken()));
  //     this.logsService.setLog('TokensService', 'isTokentExpired', this.svcGlobal.getSession('loggedInUser'));
  //     localStorage.setItem(btoa('error'), JSON.stringify('Session expired. Please login to proceed.'));
  //   }
  //   return false;
  // }

  isTokentExpired() {
    this.setTokensNames();
    if (this.getToken() != null) {
      this.logsService.setLog('TokensService', 'isTokentExpired', this.getToken());
      this.logsService.setLog('TokensService', 'isTokentExpired', this.svcGlobal.getSession('loggedInUser'));
      if ((this.getToken() && this.svcGlobal.getSession('loggedInUser')) != null) {
        if (this.jwtHelper.isTokenExpired(this.getToken()) === false) {
          return true;
        }
        this.logsService.setLog('TokensService', 'isTokentExpired', this.jwtHelper.isTokenExpired(this.getToken()));
        this.logsService.setLog('TokensService', 'isTokentExpired', this.svcGlobal.getSession('loggedInUser'));
        localStorage.setItem(btoa('error'), JSON.stringify('Session expired. Please login to proceed.'));
      }
    }
    return false;
  }

  clearTokens() {
    this.setTokensNames();
    this.svcGlobal.removeSession(this.tokenName);
    this.svcGlobal.removeSession(this.refreshTokenName);
    this.svcGlobal.removeSession('loggedInUser');
    this.svcGlobal.removeSession('lang');
  }
}
