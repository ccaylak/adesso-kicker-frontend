import {User} from './user';
import {Match} from './match';
import {NotificationType} from './notification-type.enum';
import {MessageType} from './message-type.enum';

export class Notification {
  private _notificationId: number;
  private _sender: User;
  private _receiver: User;
  private _sendDate: Date;
  private _type: NotificationType;
  private _match: Match;
  private _messageType: MessageType;

  get notificationId(): number {
    return this._notificationId;
  }

  get sender(): User {
    return this._sender;
  }

  get receiver(): User {
    return this._receiver;
  }

  get sendDate(): Date {
    return this._sendDate;
  }

  get type(): NotificationType {
    return this._type;
  }

  get match(): Match {
    return this._match;
  }

  get messageType(): MessageType {
    return this._messageType;
  }
}
