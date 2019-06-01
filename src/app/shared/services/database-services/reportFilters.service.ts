import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';

@Injectable()
export class ReportFiltersService {
  apiConfig;

  constructor(private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
  }

  getReportFiltersByReportId(reportId) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/filters/' + reportId);
  }

  getDropDownByReportFilterId(reportFilterId) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/filters/getDropDownValues/' + reportFilterId);
  }

}
