import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';

@Injectable()
export class RoleService {
  apiConfig;

  constructor(private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
  }

  getRoles() {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/roles');
  }

  addRole(role) {
  }

  updateRole(role) {
  }

  removeRole(role) {
  }

}
