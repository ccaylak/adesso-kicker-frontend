import {User} from './user';
import {Match} from './match';
import {NotificationType} from './notification-type.enum';
import {MessageType} from './message-type.enum';

export interface Notification {
  notificationId: number;
  sender: User;
  receiver: User;
  sendDate: Date;
  type: NotificationType;
  match: Match;

  messageType: MessageType;
}
