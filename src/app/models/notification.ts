import {User} from './user';
import {Match} from './match';

export interface Notification {
  notificationId: number;
  sender: User;
  receiver: User;
  sendDate: Date;
  type: string;
  match: Match;
}
