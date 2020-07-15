import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.less']
})
export class RankingComponent implements OnInit, OnDestroy {
  faChartLine = faChartLine;
  faCheck = faCheck;
  faBalanceScale = faBalanceScale;
  faTrophy = faTrophy;
  faInfoCircle = faInfoCircle;
  pages$: Observable<Page<User>>;
  usersPlaceholder: User[];
  page = 0;
  $destroy = new Subject();

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.pages$ = this.userService.getAllUsersAsPage(this.page);
    this.userService.getAllUsersAsPage(this.page).pipe(takeUntil(this.$destroy))
      .subscribe((pageUser) => this.usersPlaceholder = pageUser.content);
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
    this.userService.getAllUsersAsPage(event.page - 1).
    pipe(takeUntil(this.$destroy)).subscribe((pageUser) => this.usersPlaceholder = pageUser.content);
  }

  profile(userId: string) {
    this.router.navigateByUrl('/users/u/' + userId);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }
}
