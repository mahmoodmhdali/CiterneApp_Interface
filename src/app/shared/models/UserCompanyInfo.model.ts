import {UserProfileModel} from './UserProfile.model';
import {UserCompanyPassesModel} from './UserCompanyPasses.model';
import {UserCompanyInfoLocationsModel} from './UserCompanyInfoLocations.model';
import {UserCompanyInfoImagesModel} from './UserCompanyInfoImages.model';

export class UserCompanyInfoModel {
  public id: number;
  public country: number;
  public info: string;
  public userProfileId: UserProfileModel;
  public userCompanyInfoImagesCollection: UserCompanyInfoImagesModel[];
  public userCompanyInfoLocationsCollection: UserCompanyInfoLocationsModel[];
  public userCompanyPasses: UserCompanyPassesModel[];
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate: Date;

  constructor(id: number, country: number, info: string, userProfileId: UserProfileModel,
              userCompanyInfoImagesCollection: UserCompanyInfoImagesModel[],
              userCompanyInfoLocationsCollection: UserCompanyInfoLocationsModel[],
              userCompanyPasses: UserCompanyPassesModel[], createdDate: Date, updatedDate: Date, deletedDate: Date) {
    this.id = id;
    this.country = country;
    this.info = info;
    this.userProfileId = userProfileId;
    this.userCompanyInfoImagesCollection = userCompanyInfoImagesCollection;
    this.userCompanyInfoLocationsCollection = userCompanyInfoLocationsCollection;
    this.userCompanyPasses = userCompanyPasses;
    this.updatedDate = updatedDate;
    this.createdDate = createdDate;
    this.deletedDate = deletedDate;
  }
}
