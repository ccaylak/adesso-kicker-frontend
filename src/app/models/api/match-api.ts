import {Match} from '../match';
import {UserAPI} from './user-api';

export class MatchAPI {
  static createMatch(match: Match): Match {
    if (!match) {
      return null;
    }
    return new Match(
      match.date,
      match.winnerTeamA,
      match.teamAPlayer1,
      match.teamBPlayer1,
      match.teamAPlayer2,
      match.teamBPlayer2
    );
  }
}
