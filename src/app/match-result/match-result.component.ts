import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import {faCalendar} from '@fortawesome/free-solid-svg-icons/faCalendar';
import {Match} from '../models/match';
import {forkJoin, Observable} from 'rxjs';
import {User} from '../models/user';
import {LoginService} from '../services/login.service';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
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

  match: Match;
  bsValueAndMaxDate = new Date(Date.now());
  user$: Observable<User>;
  players$: Observable<User[]>;
  userIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private matchService: MatchService,
  ) {
  }

  matchRequestForm = this.fb.group({
    teamGroup: this.fb.group({
      playerA1: [{value: this.loginService.userId, disabled: true}],
      playerA2: ['', this.validUserIdValidator()],
      playerB1: ['', [Validators.required, this.validUserIdValidator()]],
      playerB2: ['', this.validUserIdValidator()],
    }, {validators: samePlayerValidator}),
    matchGroup: this.fb.group({
      date: [new Date(), Validators.required],
      winnerTeam: ['teamA', Validators.required]
    })
  });

  ngOnInit() {
    this.user$ = this.userService.getUser(this.loginService.userId);
    this.players$ = this.userService.getAllUsers();
    this.players$.subscribe((userArray) => {
      userArray.forEach((userObject) => {
        this.userIds.push(userObject.userId);
      });
    });
  }

  submitMatch() {
    const playerA2: string = this.playerA2.value;
    const playerB1: string = this.playerB1.value;
    const playerB2: string = this.playerB2.value;

    if (!playerA2 && playerB1 && !playerB2) {
      this.Match1v1();
    }

    if (!playerA2 && playerB1 && playerB2) {
      this.Match1v2();
    }

    if (playerA2 && playerB1 && !playerB2) {
      this.Match2v1();
    }

    if (playerA2 && playerB1 && playerB2) {
      this.Match2v2();
    }
  }

  private Match1v1() {
    forkJoin([
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerB1.value),
    ]).subscribe((userArray) => {
      this.match = {
        date: this.date.value,
        teamAPlayer1: userArray[0],
        teamAPlayer2: null,
        teamBPlayer1: userArray[1],
        teamBPlayer2: null,
        winnerTeamA: this.winnerTeam.value === 'teamA'
      };
      this.matchService.addMatch(this.match).subscribe(
        value => console.log('Success'),
      );
    });
  }

  private Match1v2() {
    forkJoin([
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerB1.value),
      this.userService.getUser(this.playerB2.value)
    ]).subscribe((userArray) => {
      this.match = {
        date: this.date.value,
        teamAPlayer1: userArray[0],
        teamAPlayer2: null,
        teamBPlayer1: userArray[1],
        teamBPlayer2: userArray[2],
        winnerTeamA: this.winnerTeam.value === 'teamA'
      };
      this.matchService.addMatch(this.match).subscribe(
        value => console.log('Success'),
      );
    });
  }

  private Match2v1() {
    forkJoin([
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerA2.value),
      this.userService.getUser(this.playerB1.value),
    ]).subscribe((userArray) => {
      this.match = {
        date: this.date.value,
        teamAPlayer1: userArray[0],
        teamAPlayer2: userArray[1],
        teamBPlayer1: userArray[2],
        teamBPlayer2: null,
        winnerTeamA: this.winnerTeam.value === 'teamA'
      };
      this.matchService.addMatch(this.match).subscribe(
        value => console.log('Success'),
      );
    });
  }

  private Match2v2() {
    forkJoin([
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerA2.value),
      this.userService.getUser(this.playerB1.value),
      this.userService.getUser(this.playerB2.value)
    ]).subscribe((userArray) => {
      this.match = {
        date: this.date.value,
        teamAPlayer1: userArray[0],
        teamAPlayer2: userArray[1],
        teamBPlayer1: userArray[2],
        teamBPlayer2: userArray[3],
        winnerTeamA: this.winnerTeam.value === 'teamA'
      };
      this.matchService.addMatch(this.match).subscribe(
        value => console.log('Success: ' + value),
      );
    });
  }

  private validUserIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.userIds.includes(control.value) && control.value !== '') {
        return {invalidUserId: true};
      }
      return null;
    };
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
}



