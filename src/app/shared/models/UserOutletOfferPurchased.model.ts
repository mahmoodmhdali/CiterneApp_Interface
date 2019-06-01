import {UserProfileModel} from './UserProfile.model';
import {UserOutletOfferModel} from './UserOutletOffer.model';

export class UserOutletOfferPurchasedModel {
  public id: number;
  public usedDate: Date;
  public nextResetDate: Date;
  public counter: number;
  public userProfileId: UserProfileModel;
  public userOutletOffer: UserOutletOfferModel;

  constructor(id: number, usedDate: Date, nextResetDate: Date, counter: number, userProfileId: UserProfileModel,
              userOutletOffer: UserOutletOfferModel) {
    this.id = id;
    this.usedDate = usedDate;
    this.nextResetDate = nextResetDate;
    this.counter = counter;
    this.userProfileId = userProfileId;
    this.userOutletOffer = userOutletOffer;
  }
}
