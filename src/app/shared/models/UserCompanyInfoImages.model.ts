import {UserCompanyInfoModel} from './UserCompanyInfo.model';

export class UserCompanyInfoImagesModel {
  public id: number;
  public imageIndex: number;
  public path: string;
  public userCompanyInfo: UserCompanyInfoModel;
  public fileName: string;

  constructor (id: number, imageIndex: number, path: string, userCompanyInfo: UserCompanyInfoModel, fileName: string) {
    this.id = id;
    this.imageIndex = imageIndex;
    this.path = path;
    this.userCompanyInfo = userCompanyInfo;
    this.fileName = fileName;
  }
}
