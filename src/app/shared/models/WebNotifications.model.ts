import {UserProfileModel} from './UserProfile.model';

export class WebNotificationsModel {
  public id: number;
  public dateAdded: string;
  public user: UserProfileModel;
  public hasSEEN: boolean;
  public text: string;
  public href: string;

  constructor(id: number, dateAdded: string, user: UserProfileModel,
              hasSEEN: boolean, text: string, href: string) {
    this.id = id;
    this.dateAdded = dateAdded;
    this.user = user;
    this.hasSEEN = hasSEEN;
    this.text = text;
    this.href = href;
  }
}
