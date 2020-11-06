import {Statistic} from './statistic';
import {StatisticAPI} from './api/statistic-api';

export class User {
  private _userId: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _emailNotifications: boolean;
  private _statistic: Statistic;

  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    emailNotifications: boolean,
    statistic: Statistic = null
  ) {
    this._userId = userId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._emailNotifications = emailNotifications;
    this._statistic = StatisticAPI.createStatistic(statistic);
  }

  set userId(userId: string) {
    this._userId = userId;
  }

  get userId(): string {
    return this._userId;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get firstName(): string {
    return this._firstName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  set emailNotifications(emailNotifications: boolean) {
    this._emailNotifications = emailNotifications;
  }

  get emailNotifications(): boolean {
    return this._emailNotifications;
  }

  set statistic(statistic: Statistic) {
    this._statistic = statistic;
  }

  get statistic(): Statistic {
    return this._statistic;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }
}
