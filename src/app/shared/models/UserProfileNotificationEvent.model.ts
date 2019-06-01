import {NotificationEventModel} from './NotificationEvent.model';
import {UserProfileModel} from './UserProfile.model';

export class UserProfileNotificationEventModel {
  public id: number;
  public notificationEvents: NotificationEventModel;
  public userProfile: UserProfileModel;
  public enabled: boolean;

  constructor(id: number, notificationEvents: NotificationEventModel,
              userProfile: UserProfileModel, enabled: boolean) {
    this.id = id;
    this.notificationEvents = notificationEvents;
    this.userProfile = userProfile;
    this.enabled = enabled;
  }
}
