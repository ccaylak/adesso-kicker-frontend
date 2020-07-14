import {User} from './user';

export interface Match {
  date: Date;
  teamAPlayer1: User;
  teamAPlayer2: User;
  teamBPlayer1: User;
  teamBPlayer2: User;
  winnerTeamA: boolean;
}
