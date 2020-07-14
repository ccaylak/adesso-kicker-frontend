import {User} from './user';

export interface TrackedStatistic {
  trackedStatisticsId: string;
  rank: number;
  rating: number;
  wins: number;
  losses: number;
  user: User;
  date: Date;
}
