import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {faChartLine, faTrophy, faFutbol, faCheck, faTimes, faChartPie} from '@fortawesome/free-solid-svg-icons';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

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
  faChartPie = faChartPie;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.route.params.subscribe(params => {
      this.user$ = this.userService.getUser(params.userId);
    });
  }
}
