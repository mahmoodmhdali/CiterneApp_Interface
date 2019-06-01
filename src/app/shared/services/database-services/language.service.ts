import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LanguageService {
  apiConfig;
  private currentLang: BehaviorSubject<string>;

  constructor(private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
    this.currentLang = new BehaviorSubject<string>('none');
  }

  getCurrentLang(): Observable<string> {
    return this.currentLang.asObservable();
  }

  setCurrentLang(newValue: string): void {
    this.currentLang.next(newValue);
  }

  getLanguages() {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/languages');
  }


}
