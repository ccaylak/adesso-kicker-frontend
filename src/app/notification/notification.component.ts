import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from '../services/notification.service';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {Notification} from '../models/notification';
import {Match} from '../models/match';
import {User} from '../models/user';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  faEnvelope = faEnvelope;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notifications$ = this.notificationService.getAllNotifications();
  }

  acceptNotification(notificationId: number) {
    this.notificationService.acceptNotification(notificationId).subscribe(value => console.log(value));
  }

  declineNotification(notificationId: number) {
    this.notificationService.declineNotification(notificationId);
  }

  getWinners(match: Match): User[] {
    const users = [];
    if (match.winnerTeamA) {
      if (match.teamAPlayer1 && match.teamAPlayer2) {
        users.push(match.teamAPlayer1);
        users.push(match.teamAPlayer2);
      }
      if (match.teamAPlayer1 && !match.teamAPlayer2) {
        users.push(match.teamAPlayer1);
      }
    }
    if (!match.winnerTeamA) {
      if (match.teamBPlayer1 && match.teamBPlayer2) {
        users.push(match.teamBPlayer1);
        users.push(match.teamBPlayer2);
      }
      if (match.teamBPlayer1 && !match.teamBPlayer2) {
        users.push(match.teamBPlayer1);
      }
    }
    return users;
  }
}
