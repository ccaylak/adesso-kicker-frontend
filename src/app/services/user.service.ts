import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {TrackedStatistic} from '../models/tracked-statistic';
import {Page} from '../models/page';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {UserAPI} from '../models/api/user-api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.BASE_PATH}/users/u/${userId}`)
      .pipe(map(user => UserAPI.createUser(user)));
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.BASE_PATH}/users/all`)
      .pipe(map(users => users.map(user => UserAPI.createUser(user)))
      );
  }

  getAllUsersAsPage(page: number): Observable<Page<User>> {
    const params = new HttpParams().set('page', page.toString());
    return this.httpClient.get<Page<User>>(`${environment.BASE_PATH}/users/ranking/all`, {params});
    /*
    .pipe(map((userPage) => userPage.content.push()
      .map(user => {
        const pushUser = UserAPI.createUser(user);
        userPage.content.push(pushUser);
        return pushUser;
      }))
    );
     */
  }

  toggleEmailNotifications() {
    return this.httpClient.get(`${environment.BASE_PATH}/users/mail/toggle`);
  }

  getEmailNotifications() {
    return this.httpClient.get<boolean>(`${environment.BASE_PATH}/users/mail/notification`);
  }
}

