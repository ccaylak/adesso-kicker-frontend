import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {NotificationAPI} from '../models/api/notification-api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`${environment.BASE_PATH}/notifications/get`)
      .pipe(
        map(notifications => notifications
          .map(notification => NotificationAPI.createNotification(notification)
          ))
      );
  }

  acceptNotification(notificationId: number) {
    return this.httpClient.get(`${environment.BASE_PATH}/notifications/accept/${notificationId}`);
  }

  declineNotification(notificationId: number) {
    return this.httpClient.get(`${environment.BASE_PATH}/notifications/decline/${notificationId}`);
  }
}
