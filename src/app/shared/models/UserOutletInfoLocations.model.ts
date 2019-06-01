import {UserOutletInfoModel} from './UserOutletInfo.model';

export class UserOutletInfoLocationsModel {
  public id: number;
  public locationIndex: number;
  public longitude: string;
  public latitude: string;
  public userOutletInfo: UserOutletInfoModel;

  constructor(id: number, locationIndex: number, longitude: string, latitude: string, userOutletInfo: UserOutletInfoModel) {
    this.id = id;
    this.locationIndex = locationIndex;
    this.longitude = longitude;
    this.latitude = latitude;
    this.userOutletInfo = userOutletInfo;
  }
}
