import {Statistic} from './statistic';

export class User {
  private _userId: string;
  private _firstName: string;
  private _lastName: string;
  private _emailNotifications: boolean;
  private _statistic: Statistic;

  get userId(): string {
    return this._userId;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get emailNotifications(): boolean {
    return this._emailNotifications;
  }

  get statistic(): Statistic {
    return this._statistic;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
