import {User} from './user';

export class Match {
  private _date: Date;
  private _winnerTeamA: boolean;
  private _playerA1: User;
  private _playerA2: User;
  private _playerB1: User;
  private _playerB2: User;

  constructor(date: Date, winnerTeamA: boolean, playerA1: User, playerB1: User, playerA2: User = null, playerB2: User = null) {
    this._date = date;
    this._winnerTeamA = winnerTeamA;
    this._playerA1 = playerA1;
    this._playerB1 = playerB1;
    this._playerA2 = playerA2;
    this._playerB2 = playerB2;
  }

  get date(): Date {
    return this._date;
  }

  get winnerTeamA(): boolean {
    return this._winnerTeamA;
  }

  get playerA1(): User {
    return this._playerA1;
  }

  get playerA2(): User {
    return this._playerA2;
  }

  get playerB1(): User {
    return this._playerB1;
  }

  get playerB2(): User {
    return this._playerB2;
  }

  get winners(): string[] {
    const users: string[] = [];
    if (this._winnerTeamA) {
      if (this._playerA1 && this._playerA2) {
        users.push(this._playerA1.fullName);
        users.push(this._playerA2.fullName);
      }
      if (this._playerA1 && !this._playerA2) {
        users.push(this._playerA1.fullName);
      }
    } else {
      if (this._playerB1 && this._playerB2) {
        users.push(this._playerB1.fullName);
        users.push(this._playerB2.fullName);
      }
      if (this._playerB1 && !this._playerB2) {
        users.push(this._playerB1.fullName);
      }
    }
    return users;
  }
}
