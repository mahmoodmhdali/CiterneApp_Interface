import {UserCompanyInfoModel} from './UserCompanyInfo.model';

export class UserCompanyInfoLocationsModel {
  public id: number;
  public locationIndex: number;
  public longitude: string;
  public latitude: string;
  public userCompanyInfo: UserCompanyInfoModel;

  constructor(id: number, locationIndex: number, longitude: string, latitude: string, userCompanyInfo: UserCompanyInfoModel) {
    this.id = id;
    this.locationIndex = locationIndex;
    this.longitude = longitude;
    this.latitude = latitude;
    this.userCompanyInfo = userCompanyInfo;
  }
}
