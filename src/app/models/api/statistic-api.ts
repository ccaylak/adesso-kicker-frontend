import {Statistic} from '../statistic';

export class StatisticAPI {
  static createStatistic(statistic: Statistic): Statistic {
    if (!statistic) {
      return null;
    }
    return new Statistic(
      statistic.rating,
      statistic.rank,
      statistic.wins,
      statistic.losses
    );
  }
}
