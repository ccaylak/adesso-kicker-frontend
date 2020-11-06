import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {faChartLine, faCheck, faTrophy, faInfoCircle, faChartPie, faUser} from '@fortawesome/free-solid-svg-icons';
import {User} from '../models/user';
import {Page} from '../models/page';
import {PageChangedEvent} from 'ngx-bootstrap';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.less']
})
export class RankingComponent implements OnInit {
  faChartLine = faChartLine;
  faUser = faUser;
  faCheck = faCheck;
  faChartPie = faChartPie;
  faTrophy = faTrophy;
  faInfoCircle = faInfoCircle;
  pages$: Observable<Page<User>>;
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    if (this.loginService.token) {
      this.getUser(this.loginService.userId);
    }
  }

  getUser(userId: string) {
    this.user$ = this.userService.getUser(userId);
  }

  getAllUsers() {
    this.pages$ = this.userService.getAllUsersAsPage(0);
  }

  pageChanged(event: PageChangedEvent): void {
    this.pages$ = this.userService.getAllUsersAsPage(event.page - 1);
  }
}
