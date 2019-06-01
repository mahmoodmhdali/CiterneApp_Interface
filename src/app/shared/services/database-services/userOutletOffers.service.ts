import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';

@Injectable()
export class UserOutletOffersService {
  apiConfig;

  constructor (private svcGlobal: GlobalService, private httpClient: HttpClient) {
    this.apiConfig = this.svcGlobal.getSession('API_CONFIG');
  }

  getAllOffers () {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/userOutletOffer');
  }

  getAllTypes () {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/outletOfferType');
  }

  getAllOffersPaging (pageNumber, maxResult) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/userOutletOffer/' + pageNumber + '/' + maxResult);
  }

  addOffer (formData) {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/userOutletOffer/add', formData, {headers});

  }

  editOffer (formData) {
    const headers = new HttpHeaders({'Accept': 'application/json'});
    return this.httpClient.post(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/userOutletOffer/edit', formData, {headers});

  }

  getAllOffersByType (typeId) {
    return this.httpClient.get<ResponseBuilderModel>(this.apiConfig.API_PROTOCOL + '://' +
      this.apiConfig.API_IP
      + ':' + this.apiConfig.API_PORT + '/'
      + this.apiConfig.API_PATH + '/userOutletOffer/type/' + typeId);
  }

}
