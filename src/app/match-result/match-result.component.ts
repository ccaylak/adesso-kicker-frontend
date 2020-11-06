import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {faCalendar, faInfoCircle, faTrophy, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Match} from '../models/match';
import {User} from '../models/user';
import {samePlayerValidator} from '../services/validator';
import {LoginService} from '../services/login.service';
import {MatchService} from '../services/match.service';
import {UserService} from '../services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {NotyfService} from 'ng-notyf';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.less']
})
export class MatchResultComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  faCalender = faCalendar;
  faSpinner = faSpinner;
  faTrophy = faTrophy;
  loading = false;

  match: Match;
  bsValueAndMaxDate = new Date(Date.now());
  user$: Observable<User>;
  players$: Observable<User[]>;
  userIds: string[] = [];
  dateFormat: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private matchService: MatchService,
    private translate: TranslateService,
    private notyfService: NotyfService,
  ) {
    if (translate.getBrowserLang() === 'de') {
      this.dateFormat = 'DD.MM.YYYY';
    } else {
      this.dateFormat = 'MM/DD/YYYY';
    }
    this.notyfService.toastDelay = 4000;
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
      winnerTeamA: ['teamA', Validators.required]
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

  onSubmit() {
    this.submitMatch();
  }

  private submitMatch() {
    const playerA2: string = this.playerA2.value;
    const playerB1: string = this.playerB1.value;
    const playerB2: string = this.playerB2.value;
    this.loading = true;
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
    forkJoin(
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerB1.value),
    ).subscribe(userArray => {
      this.matchService.addMatch(new Match(
        this.date.value,
        this.isWinnerTeamA,
        userArray[0],
        userArray[1]
      )).subscribe(
        () => {
          this.notyfService.success(this.translate.instant('MATCH-RESULT.SUCCESS.1V1'));
          this.resetForm();
        }
      );
    });
  }

  private resetForm() {
    this.matchRequestForm.reset({
      teamGroup: {
        playerA1: this.loginService.userId,
        playerA2: '',
        playerB1: '',
        playerB2: ''
      },
      matchGroup: {
        date: new Date(),
        winnerTeamA: 'teamA'
      }
    });
    this.loading = false;
  }

  private Match1v2() {
    forkJoin(
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerB1.value),
      this.userService.getUser(this.playerB2.value)
    ).subscribe(userArray => {
      this.matchService.addMatch(new Match(
        this.date.value,
        this.isWinnerTeamA,
        userArray[0],
        userArray[1],
        userArray[2]
      )).subscribe(
        () => {
          this.notyfService.success(this.translate.instant('MATCH-RESULT.SUCCESS.1V2'));
          this.resetForm();
        }
      );
    });
  }

  private Match2v1() {
    forkJoin(
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerA2.value),
      this.userService.getUser(this.playerB1.value),
    ).subscribe((userArray) => {
      this.matchService.addMatch(new Match(
        this.date.value,
        this.isWinnerTeamA,
        userArray[0],
        userArray[1],
        userArray[2]
      )).subscribe(
        () => {
          this.notyfService.success(this.translate.instant('MATCH-RESULT.SUCCESS.2V1'));
          this.resetForm();
        }
      );
    });
  }

  private Match2v2() {
    forkJoin(
      this.userService.getUser(this.loginService.userId),
      this.userService.getUser(this.playerA2.value),
      this.userService.getUser(this.playerB1.value),
      this.userService.getUser(this.playerB2.value)
    ).subscribe(userArray => {
      this.matchService.addMatch(
        new Match(
          this.date.value,
          this.isWinnerTeamA,
          userArray[0],
          userArray[1],
          userArray[2],
          userArray[3])
      ).subscribe(
        value => {
          this.notyfService.success(this.translate.instant('MATCH-RESULT.SUCCESS.2V2'));
          this.resetForm();
        }
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

  get isWinnerTeamA(): boolean {
    return this.matchRequestForm.get('matchGroup.winnerTeamA').value === 'teamA';
  }
}


