import {UserOutletInfoModel} from './UserOutletInfo.model';

export class OutletCategoryModel {
  public id: number;
  public name: string;
  public userOutletInfoCollection: UserOutletInfoModel[];
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate: Date;

  constructor(id: number, name: string, userOutletInfoCollection: UserOutletInfoModel[],
              createdDate: Date, updatedDate: Date, deletedDate: Date) {
    this.id = id;
    this.name = name;
    this.userOutletInfoCollection = userOutletInfoCollection;
    this.updatedDate = updatedDate;
    this.createdDate = createdDate;
    this.deletedDate = deletedDate;
  }
}
