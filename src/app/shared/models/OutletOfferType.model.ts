import {UserOutletOfferModel} from './UserOutletOffer.model';

export class OutletOfferTypeModel {
  public id: number;
  public name: string;
  public userOutletOffers: UserOutletOfferModel[];
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate: Date;

  constructor(id: number, name: string, userOutletOffers: UserOutletOfferModel[],
              createdDate: Date, updatedDate: Date, deletedDate: Date) {
    this.id = id;
    this.name = name;
    this.userOutletOffers = userOutletOffers;
    this.updatedDate = updatedDate;
    this.createdDate = createdDate;
    this.deletedDate = deletedDate;
  }
}
