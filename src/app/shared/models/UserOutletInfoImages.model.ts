import {UserOutletInfoModel} from './UserOutletInfo.model';

export class UserOutletInfoImagesModel {
  public id: number;
  public imageIndex: number;
  public path: string;
  public userOutletInfo: UserOutletInfoModel;
  public fileName: string;

  constructor(id: number, imageIndex: number, path: string, userOutletInfo: UserOutletInfoModel, fileName: string) {
    this.id = id;
    this.imageIndex = imageIndex;
    this.path = path;
    this.userOutletInfo = userOutletInfo;
    this.fileName = fileName;
  }
}
