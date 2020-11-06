import {Notification} from '../notification';
import {MatchAPI} from './match-api';
import {UserAPI} from './user-api';

export class NotificationAPI {

  static createNotification(notification: Notification): Notification {
    return new Notification(
      notification.notificationId,
      notification.sender,
      notification.receiver,
      notification.sendDate,
      notification.type,
      notification.match,
      notification.messageType
    );
  }
}
