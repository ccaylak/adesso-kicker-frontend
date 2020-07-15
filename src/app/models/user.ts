import {Statistic} from './statistic';

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailNotifications: boolean;
  statistic: Statistic;
}
