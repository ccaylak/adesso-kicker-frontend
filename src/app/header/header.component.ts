import {Component, OnInit} from '@angular/core';
import {BsDropdownConfig} from 'ngx-bootstrap/dropdown/';
import {faCalendarCheck, faTrophy, faUser, faSignOutAlt, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NotyfService} from 'ng-notyf';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [{provide: BsDropdownConfig, useValue: {autoClose: true}}]
})
export class HeaderComponent implements OnInit {
  faCalenderCheck = faCalendarCheck;
  faTrophy = faTrophy;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faEnvelope = faEnvelope;
  emailNotification$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private translateService: TranslateService,
    private loginService: LoginService,
    private notyfService: NotyfService
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

  get userId() {
    return this.loginService.userId;
  }

  get token() {
    return this.loginService.token;
  }

  get fullName() {
    return this.loginService.fullName;
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }

  toggleEmailNotifications() {
    this.userService.toggleEmailNotifications().subscribe(() => {
      this.emailNotification$ = this.userService.getEmailNotifications();
      this.emailNotification$.subscribe(emails => {
          if (emails) {
            this.notyfService.success(this.translate('HEADER.EMAILS.ENABLED'));
          } else {
            this.notyfService.error(this.translate('HEADER.EMAILS.DISABLED'));
          }
        }
      );
    });
  }
}
