import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TrackedStatistic} from '../models/tracked-statistic';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {TrackedStatisticAPI} from '../models/api/tracked-statistic-api';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackedStatisticService {
  constructor(private httpClient: HttpClient) {
  }

  getAllTrackedStatistics(userId: string): Observable<TrackedStatistic[]> {
    return this.httpClient.get<TrackedStatistic[]>(`${environment.BASE_PATH}/users/statistics/${userId}`)
      .pipe(
        map(trackedStatistics => trackedStatistics
          .map(trackedStatistic => TrackedStatisticAPI.createTrackedStatistic(trackedStatistic)
          ))
      );
  }

}
