import {UserProfileModel} from './UserProfile.model';

export class UserPassPurchasedModel {
  public id: number;
  public isPaid: boolean;
  public status: number;
  public validTill: Date;
  public userProfileId: UserProfileModel;

  constructor(id: number, isPaid: boolean, status: number, validTill: Date, userProfileId: UserProfileModel) {
    this.id = id;
    this.isPaid = isPaid;
    this.status = status;
    this.validTill = validTill;
    this.userProfileId = userProfileId;
  }
}
