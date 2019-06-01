import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';
import {ResponseContentType} from '@angular/http';

@Injectable()
export class ReportsService {
  apiConfig;

  constructor(private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
  }

  getReports() {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports');
  }

  getReportsByLoggedInUser() {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/roles');
  }

  getReport(reportId) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/' + reportId);
  }

  getReportByProcID(procID, pageNumber, offset, withCounter, filtersDataText, filtersDataDate,
                    filtersDataNumber, filtersDataNumberOperation, filtersDataDropDown, withLimit) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/getByProcID/' + procID + '/' + pageNumber + '/' +
      offset + '/' + withCounter + '/' + withLimit + '?' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataText) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataDate) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataNumber) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataNumberOperation) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataDropDown));
  }

  addReport(report) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/add', this.svcGlobal.getFormUrlEncoded(report), {headers});
  }

  editReport(report) {
    // if we need the full response we should add {headers, observe: 'response'}
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/edit', this.svcGlobal.getFormUrlEncoded(report), {headers});
  }

  removeReport(report) {
    // if we need the full response we should add {headers, observe: 'response'}
    return this.httpClient.delete(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/delete/' + report.id);
  }

  exportReportByProcID(procID, filtersDataText, filtersDataDate,
                       filtersDataNumber, filtersDataNumberOperation, filtersDataDropDown) {
    return this.httpClient.get(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/reports/exportByProcID/' + procID + '?' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataText) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataDate) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataNumber) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataNumberOperation) + '&' +
      this.svcGlobal.getFormUrlEncodedFromJson(filtersDataDropDown), { responseType: 'blob' });
  }

}
