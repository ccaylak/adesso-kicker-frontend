import {User} from './user';
import {Match} from './match';
import {NotificationType} from './notification-type.enum';
import {MessageType} from './message-type.enum';
import {MatchAPI} from './api/match-api';
import {UserAPI} from './api/user-api';

export class Notification {
  private _notificationId: number;
  private _sender: User;
  private _receiver: User;
  private _sendDate: Date;
  private _type: NotificationType;
  private _match: Match;
  private _messageType: MessageType;

  constructor(
    notificationId: number,
    sender: User,
    receiver: User,
    sendDate: Date,
    type: NotificationType,
    match: Match,
    messageType: MessageType
  ) {
    this._notificationId = notificationId;
    this._sender = UserAPI.createUser(sender);
    this._receiver = UserAPI.createUser(receiver);
    this._sendDate = sendDate;
    this._type = type;
    this._match = MatchAPI.createMatch(match);
    this._messageType = messageType;
  }

  get notificationId(): number {
    return this._notificationId;
  }

  set notificationId(notificationId: number) {
    this._notificationId = notificationId;
  }

  get sender(): User {
    return this._sender;
  }

  set sender(sender: User) {
    this._sender = sender;
  }

  get receiver(): User {
    return this._receiver;
  }

  set receiver(receiver: User) {
    this._receiver = receiver;
  }

  get sendDate(): Date {
    return this._sendDate;
  }

  set sendDate(sendDate: Date) {
    this._sendDate = sendDate;
  }

  get type(): NotificationType {
    return this._type;
  }

  set type(type: NotificationType) {
    this._type = type;
  }

  get match(): Match {
    return this._match;
  }

  set match(match: Match) {
    this._match = match;
  }

  get messageType(): MessageType {
    return this._messageType;
  }

  set messageType(messageType: MessageType) {
    this._messageType = messageType;
  }
}
