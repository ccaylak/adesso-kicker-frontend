import {User} from '../user';
import {StatisticAPI} from './statistic-api';

export class UserAPI {
  static createUser(user: User): User {
    if (!user) {
      return null;
    }
    return new User(
      user.userId,
      user.firstName,
      user.lastName,
      user.email,
      user.emailNotifications,
      StatisticAPI.createStatistic(user.statistic)
    );
  }
}
