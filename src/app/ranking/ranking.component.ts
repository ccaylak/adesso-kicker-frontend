import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
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
  usersPlaceholder: User[];
  page = 0;
  user$: Observable<User>;

  constructor(private userService: UserService, private router: Router, public loginService: LoginService) {
  }

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
    this.pages$ = this.userService.getAllUsersAsPage(this.page);
    this.userService.getAllUsersAsPage(this.page)
      .subscribe((pageUser) => {
        this.usersPlaceholder = pageUser.content;
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.userService.getAllUsersAsPage(event.page - 1).subscribe((pageUser) => this.usersPlaceholder = pageUser.content);
  }

  profile(userId: string) {
    this.router.navigateByUrl('/users/u/' + userId);
  }
}
