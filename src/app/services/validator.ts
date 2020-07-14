import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const samePlayerValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const teamAPlayer1 = control.get('teamPlayerA1').value;
  const teamAPlayer2 = control.get('teamPlayerA2').value;
  const teamBPlayer1 = control.get('teamPlayerB1').value;
  const teamBPlayer2 = control.get('teamPlayerB2').value;

  if (equals(teamAPlayer1, teamAPlayer2)
    || equals(teamAPlayer2, teamBPlayer1)
    || equals(teamBPlayer1, teamBPlayer2)
    || equals(teamAPlayer1, teamBPlayer1)
    || equals(teamAPlayer2, teamBPlayer2)
    || equals(teamAPlayer1, teamBPlayer2)) {
    return {samePlayer: true};
  }

  if (equals(teamAPlayer1, teamBPlayer1)
    || equals(teamBPlayer1, teamBPlayer2)
    || equals(teamAPlayer1, teamBPlayer2)) {
    return {samePlayer: true};
  }

  if ((equals(teamAPlayer1, teamBPlayer1))
    || (equals(teamBPlayer1, teamBPlayer2))
    || (equals(teamAPlayer1, teamBPlayer2))) {
    return {samePlayer: true};
  }

  if (equals(teamAPlayer1, teamAPlayer2)
    || equals(teamAPlayer1, teamBPlayer1)
    || equals(teamAPlayer2, teamBPlayer1)) {
    return {samePlayer: true};
  }

  if (equals(teamAPlayer1, teamBPlayer1)) {
    return {samePlayer: true};
  }
  return null;
};

function equals(a, b): boolean {
  return a && a === b;
}
