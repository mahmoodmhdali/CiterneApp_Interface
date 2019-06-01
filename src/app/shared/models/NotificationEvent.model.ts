import {NotificationTextModel} from './NotificationText.model';
import {UserProfileNotificationEventModel} from './UserProfileNotificationEvent.model';

export class NotificationEventModel {
  public id: number;
  public name: string;
  public hasWeb: boolean;
  public hasSMS: boolean;
  public hasEmail: boolean;
  public texts: NotificationTextModel[];
  public userProfileNotificationEventCollection: UserProfileNotificationEventModel[];

  constructor(id: number, name: string, hasWeb: boolean, hasSMS: boolean,
              hasEmail: boolean, texts: NotificationTextModel[],
              userProfileNotificationEventCollection: UserProfileNotificationEventModel[]) {
    this.id = id;
    this.name = name;
    this.hasWeb = hasWeb;
    this.hasSMS = hasSMS;
    this.hasEmail = hasEmail;
    this.texts = texts;
    this.userProfileNotificationEventCollection = userProfileNotificationEventCollection;
  }
}
