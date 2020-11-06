import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Match} from '../models/match';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Statistic} from '../models/statistic';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private http: HttpClient) {
  }

  addMatch(match: Match) {
    return this.http.post(`${environment.BASE_PATH}/matches/add`, {
      date: match.date,
      winnerTeamA: match.winnerTeamA,
      teamAPlayer1: this.userObject(match.teamAPlayer1),
      teamBPlayer1: this.userObject(match.teamBPlayer1),
      teamAPlayer2: this.userObject(match.teamAPlayer2),
      teamBPlayer2: this.userObject(match.teamBPlayer2)
    });
  }

  private userObject(user: User) {
    if (!user) {
      return null;
    }
    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      emailNotifications: user.emailNotifications,
      statistic: user.statistic
    };
  }
}

export interface MatchAPI {
  date: Date;
  winnerTeamA: boolean;
  playerA1: User;
  playerA2: User;
  playerB1: User;
  playerB2: User;
}
