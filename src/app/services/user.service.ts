import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {TrackedStatistic} from '../models/tracked-statistic';
import {Page} from '../models/page';
import {map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  getUser(userId: string): Observable<User> {
    if(userId==="you"){
      return this.httpClient.get<User>(`${environment.BASE_PATH}/users/you`);
    }
    return this.httpClient.get<User>(`${environment.BASE_PATH}/users/u/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<Page<User>>(`${environment.BASE_PATH}/ranking/all`).pipe(map((data) => data.content));
  }

  getAllUsersAsPage(page: number): Observable<Page<User>> {
    const params = new HttpParams().set('page', page.toString());
    return this.httpClient.get<Page<User>>(`${environment.BASE_PATH}/users/ranking/all`, {params});
  }

  getAllTrackedStatistics(userId: string): Observable<TrackedStatistic[]> {
    return this.httpClient.get<TrackedStatistic[]>(`${environment.BASE_PATH}/statistics/${userId}`);
  }

  toggleMail() {
    return this.httpClient.get(`${environment.BASE_PATH}/users/mail/toggle`);
  }
}

