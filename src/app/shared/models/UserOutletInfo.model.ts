import {UserProfileModel} from './UserProfile.model';
import {OutletCategoryModel} from './OutletCategory.model';
import {UserOutletOfferModel} from './UserOutletOffer.model';
import {UserOutletInfoLocationsModel} from './UserOutletInfoLocations.model';
import {UserOutletInfoImagesModel} from './UserOutletInfoImages.model';

export class UserOutletInfoModel {
  public id: number;
  public country: number;
  public info: string;
  public userProfileId: UserProfileModel;
  public userOutletInfoImagesCollection: UserOutletInfoImagesModel[];
  public userOutletInfoLocationsCollection: UserOutletInfoLocationsModel[];
  public outletCategoryCollection: OutletCategoryModel[];
  public userOutletOffers: UserOutletOfferModel[];
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate: Date;

  constructor(id: number, country: number, info: string, userProfileId: UserProfileModel,
              userOutletInfoImagesCollection: UserOutletInfoImagesModel[],
              userOutletInfoLocationsCollection: UserOutletInfoLocationsModel[],
              outletCategoryCollection: OutletCategoryModel[], userOutletOffers: UserOutletOfferModel[],
              createdDate: Date, updatedDate: Date, deletedDate: Date) {
    this.id = id;
    this.country = country;
    this.info = info;
    this.userProfileId = userProfileId;
    this.userOutletInfoImagesCollection = userOutletInfoImagesCollection;
    this.userOutletInfoLocationsCollection = userOutletInfoLocationsCollection;
    this.outletCategoryCollection = outletCategoryCollection;
    this.userOutletOffers = userOutletOffers;
    this.updatedDate = updatedDate;
    this.createdDate = createdDate;
    this.deletedDate = deletedDate;
  }
}
