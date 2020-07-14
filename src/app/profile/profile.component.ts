import {Component, OnInit} from '@angular/core';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faTrophy} from '@fortawesome/free-solid-svg-icons/faTrophy';
import {faFutbol} from '@fortawesome/free-solid-svg-icons/faFutbol';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faBalanceScale} from '@fortawesome/free-solid-svg-icons/faBalanceScale';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})

export class ProfileComponent implements OnInit {
  faChartLine = faChartLine;
  faTrophy = faTrophy;
  faFutbol = faFutbol;
  faCheck = faCheck;
  faTimes = faTimes;
  faBalanceScale = faBalanceScale;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.getUser();
  }

  getFullName(myUser: User): string {
    return myUser.firstName + ' ' + myUser.lastName;
  }

  getMatches(myUser: User): number {
    return myUser.statistic.wins + myUser.statistic.losses;
  }

  getWinRatio(myUser: User): number {
    if (myUser.statistic.losses === 0) {
      return 100;
    }
    return Math.round(100 - (100 / this.getMatches(myUser) * myUser.statistic.losses));
  }

  getUser() {
    this.route.params.subscribe((params) => {
        this.user$ = this.userService.getUser(params.userId);
      },
    );
  }
}
