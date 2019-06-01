import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebNotificationsService {
  apiConfig;
  notificationsCount = 0;
  private loadedNotifications: BehaviorSubject<boolean>;
  private fetchNotifications: BehaviorSubject<Date>;

  constructor(private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
    this.loadedNotifications = new BehaviorSubject<boolean>(false);
    this.fetchNotifications = new BehaviorSubject<Date>(new Date);
  }

  getLoadedNotifications(): Observable<boolean> {
    return this.loadedNotifications.asObservable();
  }

  setLoadedNotifications(newValue: boolean): void {
    this.loadedNotifications.next(newValue);
  }

  // getFetchNotifications(): Observable<Date> {
  //   return this.fetchNotifications.asObservable();
  // }

  setFetchNotifications(): void {
    this.fetchNotifications.next(new Date);
  }

  getWebNotifications(all?: boolean) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/webNotifications/getWebNotifications?all=' + (all ? 'true' : 'false'));
  }

  updateWebNotifications() {
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/webNotifications/update', null);
  }

  // getCountWebNotifications() {
  //   return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
  //     this.apiConfig.API_IP
  //     + ':' + this.apiConfig.API_PORT + '/'
  //     + this.apiConfig.API_PATH + '/webNotifications/getCountWebNotifications');
  // }

}
