import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown/';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import {faTrophy} from '@fortawesome/free-solid-svg-icons/faTrophy';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {NotificationService} from '../services/notification.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class HeaderComponent implements OnInit, OnDestroy {
  faCalenderCheck = faCalendarCheck;
  faTrophy = faTrophy;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faEnvelope = faEnvelope;
  subscriptionHandler: Subscription[] = [];
  bool: boolean;
  emailNotification$: Observable<boolean>;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    public loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.emailNotification$ = this.userService.getEmailNotifications();
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

  toggleEmailNotifications() {
    this.userService.toggleEmailNotifications().subscribe(success => {
      this.emailNotification$ = this.userService.getEmailNotifications();
    });
  }

  onProfile() {
    this.router.navigate(['users', 'u', this.loginService.userId]);
  }

  ranking() {
    this.router.navigate(['ranking']);
  }

  match() {
    this.router.navigate(['matches', 'add']);
  }

  ngOnDestroy(): void {
    this.subscriptionHandler.forEach(subscription => subscription.unsubscribe());
  }
}
