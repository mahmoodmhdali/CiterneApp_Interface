import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';

@Injectable()
export class EventsService {
  apiConfig;

  constructor (private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
  }

  getAllEvents () {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/type/1');
  }

  getEvent (id) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/' + id);
  }

  getAllEventsPaging (pageNumber, maxResult) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/paging/type/1/' + pageNumber + '/' + maxResult);
  }

  getAllClassesPaging (pageNumber, maxResult) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/paging/type/2/' + pageNumber + '/' + maxResult);
  }

  addEvent (formData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/add', this.svcGlobal.getFormUrlEncoded(formData), {headers});

  }

  editEvent (formData) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/edit', this.svcGlobal.getFormUrlEncoded(formData), {headers});

  }

  deleteEvent (id) {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.httpClient.post<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/delete/' + id, null, {headers});

  }

  editImages (formData) {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/eventClasses/images/edit', formData, {headers});

  }

}
