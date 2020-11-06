import {TrackedStatistic} from '../tracked-statistic';

export class TrackedStatisticAPI {
  static createTrackedStatistic(trackedStatistic: TrackedStatistic) {
    return new TrackedStatistic(
      trackedStatistic.rank,
      trackedStatistic.rating,
      trackedStatistic.wins,
      trackedStatistic.losses,
      trackedStatistic.date
    );
  }
}
