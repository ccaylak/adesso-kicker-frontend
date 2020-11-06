import {User} from './user';
import {UserAPI} from './api/user-api';

export class Match {
  private _date: Date;
  private _winnerTeamA: boolean;
  private _teamAPlayer1: User;
  private _teamAPlayer2: User;
  private _teamBPlayer1: User;
  private _teamBPlayer2: User;

  constructor(date: Date, winnerTeamA: boolean, playerA1: User, playerB1: User, playerA2: User = null, playerB2: User = null) {
    this._date = date;
    this._winnerTeamA = winnerTeamA;
    this._teamAPlayer1 = UserAPI.createUser(playerA1);
    this._teamBPlayer1 = UserAPI.createUser(playerB1);
    this._teamAPlayer2 = UserAPI.createUser(playerA2);
    this._teamBPlayer2 = UserAPI.createUser(playerB2);
  }

  get date(): Date {
    return this._date;
  }

  set date(date: Date) {
    this._date = date;
  }

  get winnerTeamA(): boolean {
    return this._winnerTeamA;
  }

  set winnerTeamA(winnerTeamA: boolean) {
    this._winnerTeamA = winnerTeamA;
  }

  get teamAPlayer1(): User {
    return this._teamAPlayer1;
  }

  set teamAPlayer1(teamAPlayer1: User) {
    this._teamAPlayer1 = teamAPlayer1;
  }

  get teamAPlayer2(): User {
    return this._teamAPlayer2;
  }

  set teamAPlayer2(teamAPlayer2: User) {
    this._teamAPlayer2 = teamAPlayer2;
  }

  get teamBPlayer1(): User {
    return this._teamBPlayer1;
  }

  set teamBPlayer1(teamBPlayer1: User) {
    this._teamBPlayer1 = teamBPlayer1;
  }

  get teamBPlayer2(): User {
    return this._teamBPlayer2;
  }

  set teamBPlayer2(teamBPlayer2: User) {
    this._teamBPlayer2 = teamBPlayer2;
  }

  get winners(): { winner1: User, winner2?: User } {
    if (this._winnerTeamA) {
      return {
        winner1: this._teamAPlayer1,
        winner2: this._teamAPlayer2
      };
    } else {
      return {
        winner1: this._teamBPlayer1,
        winner2: this._teamBPlayer2
      };
    }
  }
}
