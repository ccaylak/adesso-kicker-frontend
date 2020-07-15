import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notification';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private httpClient: HttpClient) {
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`${environment.BASE_PATH}/notifications/get`);
  }

  acceptNotification(notificationId: number) {
    return this.httpClient.get(`${environment.BASE_PATH}/notifications/accept/${notificationId}`);
  }

  declineNotification(notificationId: number) {
    return this.httpClient.get(`${environment.BASE_PATH}/notifications/decline/${notificationId}`);
  }

}
