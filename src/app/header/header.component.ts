import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown/';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import {faTrophy} from '@fortawesome/free-solid-svg-icons/faTrophy';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
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
  faCheck = faCheck;
  faTimes = faTimes;
  subscriptionHandler: Subscription[] = [];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    public loginService: LoginService
  ) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

  enableDisablemails() {
    this.userService.toggleMail().subscribe(value => {
        console.log(value);
      },
      error => {
        console.log('Error: ' + error);
      });
  }

  notifications() {
    this.subscriptionHandler.push(this.notificationService.getAllNotifications().subscribe((value => {
      console.log(value);
    })));
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
