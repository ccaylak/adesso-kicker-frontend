import {Component, OnInit} from '@angular/core';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faBalanceScale} from '@fortawesome/free-solid-svg-icons/faBalanceScale';
import {faTrophy} from '@fortawesome/free-solid-svg-icons/faTrophy';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {PageChangedEvent} from 'ngx-bootstrap';
import {Page} from '../models/page';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.less']
})
export class RankingComponent implements OnInit {
  faChartLine = faChartLine;
  faCheck = faCheck;
  faBalanceScale = faBalanceScale;
  faTrophy = faTrophy;
  faInfoCircle = faInfoCircle;
  pages$: Observable<Page<User>>;
  usersPlaceholder: User[];
  page = 0;
  $destroy = new Subject();
  user$: Observable<User>;

  constructor(private userService: UserService, private router: Router, public loginService: LoginService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getUser(this.loginService.userId);
  }

  getUser(userId: string) {
    this.user$ = this.userService.getUser(userId);
  }

  getAllUsers() {
    this.pages$ = this.userService.getAllUsersAsPage(this.page);
    this.userService.getAllUsersAsPage(this.page)
      .subscribe((pageUser) => {
        this.usersPlaceholder = pageUser.content;
      });
  }

  getFullName(myUser: User): string {
    return myUser.firstName + ' ' + myUser.lastName;
  }

  getPlayedMatches(myUser: User): number {
    return myUser.statistic.wins + myUser.statistic.losses;
  }

  getWinRatio(myUser: User): number {
    if (myUser.statistic.losses === 0) {
      return 100;
    }
    return Math.round(100 - (100 / this.getPlayedMatches(myUser) * myUser.statistic.losses));
  }

  pageChanged(event: PageChangedEvent): void {
    this.userService.getAllUsersAsPage(event.page - 1).subscribe((pageUser) => this.usersPlaceholder = pageUser.content);
  }

  profile(userId: string) {
    this.router.navigateByUrl('/users/u/' + userId);
  }
}
