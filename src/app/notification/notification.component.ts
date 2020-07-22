import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from '../services/notification.service';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {Notification} from '../models/notification';
import {Match} from '../models/match';
import {User} from '../models/user';
import {BsDropdownConfig} from 'ngx-bootstrap';
import {not} from 'rxjs/internal-compatibility';
import {NotificationType} from "../models/notification-type.enum";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: false, insideClick: true}}]
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  faEnvelope = faEnvelope;
  notificationSize: number;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getAllNotifications();
    this.notificationService.getAllNotifications().subscribe(notificationArray => {
      console.log(notificationArray);
      this.notificationSize=notificationArray.length;
    });
  }

  getAllNotifications() {
    this.notifications$ = this.notificationService.getAllNotifications();
  }

  acceptNotification(notificationId: number) {
    this.notificationService.acceptNotification(notificationId).subscribe(value => {
      this.getAllNotifications();
      this.notificationSize=this.notificationSize-1;
    });
  }

  declineNotification(notificationId: number) {
    this.notificationService.declineNotification(notificationId).subscribe(value => {
      this.getAllNotifications();
      this.notificationSize=this.notificationSize-1;
    });
  }

  getWinners(match: Match): string[] {
    const users: string[] = [];
    if (match.winnerTeamA) {
      if (match.teamAPlayer1 && match.teamAPlayer2) {
        users.push(this.getFullName(match.teamAPlayer1));
        users.push(this.getFullName(match.teamAPlayer2));
      }
      if (match.teamAPlayer1 && !match.teamAPlayer2) {
        users.push(this.getFullName(match.teamAPlayer1));
      }
    } else {
      if (match.teamBPlayer1 && match.teamBPlayer2) {
        users.push(this.getFullName(match.teamBPlayer1));
        users.push(this.getFullName(match.teamBPlayer2));
      }
      if (match.teamBPlayer1 && !match.teamBPlayer2) {
        users.push(this.getFullName(match.teamBPlayer1));
      }
    }
    return users;
  }

  private getFullName(user: User) {
    return `${user.firstName} ${user.lastName}`;
  }
}
