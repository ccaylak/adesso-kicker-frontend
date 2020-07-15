import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import {faCalendar} from '@fortawesome/free-solid-svg-icons/faCalendar';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {Match} from '../models/match';
import {forkJoin, Observable} from 'rxjs';
import {User} from '../models/user';
import {LoginService} from '../services/login.service';
import {FormBuilder, Validators} from '@angular/forms';
import {samePlayerValidator} from '../services/validator';
import {MatchService} from '../services/match.service';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.less']
})
export class MatchResultComponent implements OnInit {
  faTimes = faTimes;
  faInfoCircle = faInfoCircle;
  faCalender = faCalendar;
  faCheck = faCheck;

  match: Match;
  bsValueAndMaxDate = new Date(Date.now());
  user$: Observable<User>;
  players$: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private matchService: MatchService
  ) {
  }

  matchRequestForm = this.fb.group({
    teamGroup: this.fb.group({
      playerA1: [{value: this.loginService.userId, disabled: true}],
      playerA2: [''],
      playerB1: ['', Validators.required],
      playerB2: [''],
    }, {validators: samePlayerValidator}),
    matchGroup: this.fb.group({
      date: [new Date(), Validators.required],
      winnerTeam: ['teamA', Validators.required]
    })
  });

  ngOnInit() {
    this.user$ = this.userService.getUser(this.loginService.userId);
    this.players$ = this.userService.getAllUsers();
  }

  get date() {
    return this.matchRequestForm.get('matchGroup.date');
  }

  get teamGroup() {
    return this.matchRequestForm.get('teamGroup');
  }

  get playerA2() {
    return this.matchRequestForm.get('teamGroup.playerA2');
  }

  get playerB1() {
    return this.matchRequestForm.get('teamGroup.playerB1');
  }

  get playerB2() {
    return this.matchRequestForm.get('teamGroup.playerB2');
  }

  get winnerTeam() {
    return this.matchRequestForm.get('matchGroup.winnerTeam');
  }

  matchParser() {
    const matchDate: Date = this.date.value;
    const matchWinnerTeam = this.winnerTeam.value === 'teamA';
    const matchTeamPlayerA2: string = this.playerA2.value;
    const matchTeamPlayerB1: string = this.playerB1.value;
    const matchTeamPlayerB2: string = this.playerB2.value;
    forkJoin([
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(matchTeamPlayerA2),
      this.userService.getUser(matchTeamPlayerB1),
      this.userService.getUser(matchTeamPlayerB2)
    ]).subscribe((userArray) => {
      this.match = {
        date: matchDate,
        teamAPlayer1: userArray[0],
        teamAPlayer2: userArray[1],
        teamBPlayer1: userArray[2],
        teamBPlayer2: userArray[3],
        winnerTeamA: matchWinnerTeam
      };
      this.matchService.addMatch(this.match).subscribe(value => console.log('Success: ' + value), err => alert('moin'));
      console.log(this.match);
    });
  }

  onSubmit() {
    console.log(this.matchRequestForm);
  }
}
