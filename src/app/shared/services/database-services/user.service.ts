import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';

@Injectable()
export class UserService {
  apiConfig;

  constructor (private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
  }

  getUsers () {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users');
  }

  getUsersPagination (pageNumber, maxResult, type) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users/' + pageNumber + '/' + maxResult + '/' + type);
  }

  addSystemUser (user) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users/add', this.svcGlobal.getFormUrlEncoded(user), {headers});
  }

  addNormalUser (user) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/guest/createAccount', this.svcGlobal.getFormUrlEncoded(user), {headers});
  }

  addUserUnderCompany (user, packageId) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users/addCompanyUser/' + packageId, this.svcGlobal.getFormUrlEncoded(user), {headers});
  }

  updateUser (user) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users/update', this.svcGlobal.getFormUrlEncoded(user), {headers});
  }

  removeUser (user) {
    // if we need the full response we should add {headers, observe: 'response'}
    return this.httpClient.delete(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users/delete/' + user.id);
  }

  getUserById (id) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users/' + id);
  }

  getUserByToken (token) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/guest/auth/token/' + token);
  }

  changePasswordByToken (token, pass) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/guest/updatePassword/' + token, this.svcGlobal.getFormUrlEncoded(pass), {headers});
  }

  resetPassword (email) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/guest/resetPassword', this.svcGlobal.getFormUrlEncoded(email), {headers});
  }

  getUsersNotifications () {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/users/getUsersNotifications');
  }

}
