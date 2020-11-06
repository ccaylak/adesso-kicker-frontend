import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationService} from '../services/notification.service';
import {faEnvelopeOpen, faEnvelope, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Notification} from '../models/notification';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NotyfService} from 'ng-notyf';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  faEnvelope = faEnvelope;
  faCheck = faCheck;
  faTimes = faTimes;
  modalRef: BsModalRef;

  constructor(
    private notificationService: NotificationService,
    private modalService: BsModalService,
    private notyfyService: NotyfService,
    private translateService: TranslateService
  ) {
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
    this.notificationService.acceptNotification(notificationId).subscribe(() => {
        this.getAllNotifications();
        this.notyfyService.success(this.translateService.instant('NOTIFICATION.SUCCESS.ACCEPTED'));
      }
    );
  }

  declineNotification(notificationId: number) {
    this.notificationService.declineNotification(notificationId).subscribe(() => {
      this.getAllNotifications();
      this.notyfyService.error(this.translateService.instant('NOTIFICATION.SUCCESS.DECLINED'));
    });
  }
}
