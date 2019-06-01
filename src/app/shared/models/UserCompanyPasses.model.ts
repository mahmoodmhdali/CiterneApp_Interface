import {UserCompanyInfoModel} from './UserCompanyInfo.model';

export class UserCompanyPassesModel {
  public id: number;
  public numberOfUsers: number;
  public remainingUsers: number;
  public userCompanyInfo: UserCompanyInfoModel;
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate: Date;

  constructor(id: number, numberOfUsers: number, remainingUsers: number, userCompanyInfo: UserCompanyInfoModel,
              createdDate: Date, updatedDate: Date, deletedDate: Date) {
    this.id = id;
    this.numberOfUsers = numberOfUsers;
    this.remainingUsers = remainingUsers;
    this.userCompanyInfo = userCompanyInfo;
    this.updatedDate = updatedDate;
    this.createdDate = createdDate;
    this.deletedDate = deletedDate;
  }
}
