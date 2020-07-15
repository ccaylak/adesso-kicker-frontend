import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const samePlayerValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const playerA1 = control.get('playerA1').value;
  const playerA2 = control.get('playerA2').value;
  const playerB1 = control.get('playerB1').value;
  const playerB2 = control.get('playerB2').value;

  if (equals(playerA1, playerA2)
    || equals(playerA2, playerB1)
    || equals(playerB1, playerB2)
    || equals(playerA1, playerB1)
    || equals(playerA2, playerB2)
    || equals(playerA1, playerB2)) {
    return {samePlayer: true};
  }

  if (equals(playerA1, playerB1)
    || equals(playerB1, playerB2)
    || equals(playerA1, playerB2)) {
    return {samePlayer: true};
  }

  if ((equals(playerA1, playerB1))
    || (equals(playerB1, playerB2))
    || (equals(playerA1, playerB2))) {
    return {samePlayer: true};
  }

  if (equals(playerA1, playerA2)
    || equals(playerA1, playerB1)
    || equals(playerA2, playerB1)) {
    return {samePlayer: true};
  }

  if (equals(playerA1, playerB1)) {
    return {samePlayer: true};
  }
  return null;
};

function equals(a, b): boolean {
  return a && a === b;
}
