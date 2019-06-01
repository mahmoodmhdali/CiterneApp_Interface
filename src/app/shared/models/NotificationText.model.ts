import {NotificationEventModel} from './NotificationEvent.model';
import {LanguageModel} from './Language.model';

export class NotificationTextModel {
  public id: number;
  public notificationEvent: NotificationEventModel;
  public language: LanguageModel;
  public text: string;

  constructor(id: number, notificationEvent: NotificationEventModel,
              language: LanguageModel, text: string) {
    this.id = id;
    this.notificationEvent = notificationEvent;
    this.language = language;
    this.text = text;
  }
}
