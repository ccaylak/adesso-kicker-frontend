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
  teamPlayers$: Observable<User[]>;
  user: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private matchService: MatchService
  ) {
  }

  matchRequestForm = this.fb.group({
    teamPlayerA1: [{value: this.loginService.userId, disabled: true}],
    teamPlayerA2: [''],
    teamPlayerB1: ['', Validators.required],
    teamPlayerB2: [''],
    date: [new Date(), Validators.required],
    winnerTeam: ['teamA', Validators.required]
  }, {validators: samePlayerValidator});

  ngOnInit() {
    this.user$ = this.userService.getUser(this.loginService.userId);
    this.teamPlayers$ = this.userService.getAllUsers();
  }

  get date() {
    return this.matchRequestForm.get('date');
  }

  get teamPlayerB1() {
    return this.matchRequestForm.get('teamPlayerB1');
  }

  matchParser() {
    const matchDate = this.matchRequestForm.get('date').value;
    const matchWinnerTeam = this.matchRequestForm.get('winnerTeam').value === 'teamA';
    const matchTeamPlayerA1 = this.matchRequestForm.get('teamPlayerA1').value;
    const matchTeamPlayerA2 = this.matchRequestForm.get('teamPlayerA2').value;
    const matchTeamPlayerB1 = this.matchRequestForm.get('teamPlayerB1').value;
    const matchTeamPlayerB2 = this.matchRequestForm.get('teamPlayerB2').value;
    forkJoin([
      this.userService.getUser(matchTeamPlayerA1),
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
      this.matchService.addMatch(this.match).subscribe(value => console.log('Success: ' + value), err=> alert("moin"));
      console.log(this.match);
    });
  }

  onSubmit() {
    console.log(this.matchRequestForm.value);
  }
}
