import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from '../services/notification.service';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpen';
import {Notification} from '../models/notification';
import {Match} from '../models/match';
import {User} from '../models/user';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NotificationType} from '../models/notification-type.enum';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService, private modalService: BsModalService) {
  }

  notifications$: Observable<Notification[]>;
  faEnvelope = faEnvelope;

  modalRef: BsModalRef;

  private static getFullName(user: User) {
    return `${user.firstName} ${user.lastName}`;
  }

  openModal(template: TemplateRef<any>) {
    this.faEnvelope = faEnvelopeOpen;
    this.modalRef = this.modalService.show(template);
    this.modalService.onHide.subscribe(() => this.faEnvelope = faEnvelope);
  }

  ngOnInit() {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notifications$ = this.notificationService.getAllNotifications();
  }

  acceptNotification(notificationId: number) {
    this.notificationService.acceptNotification(notificationId).subscribe(() => this.getAllNotifications());
  }

  declineNotification(notificationId: number) {
    this.notificationService.declineNotification(notificationId).subscribe(() => this.getAllNotifications());
  }

  getWinners(match: Match): string[] {
    const users: string[] = [];
    if (match.winnerTeamA) {
      if (match.teamAPlayer1 && match.teamAPlayer2) {
        users.push(NotificationComponent.getFullName(match.teamAPlayer1));
        users.push(NotificationComponent.getFullName(match.teamAPlayer2));
      }
      if (match.teamAPlayer1 && !match.teamAPlayer2) {
        users.push(NotificationComponent.getFullName(match.teamAPlayer1));
      }
    } else {
      if (match.teamBPlayer1 && match.teamBPlayer2) {
        users.push(NotificationComponent.getFullName(match.teamBPlayer1));
        users.push(NotificationComponent.getFullName(match.teamBPlayer2));
      }
      if (match.teamBPlayer1 && !match.teamBPlayer2) {
        users.push(NotificationComponent.getFullName(match.teamBPlayer1));
      }
    }
    return users;
  }
}
