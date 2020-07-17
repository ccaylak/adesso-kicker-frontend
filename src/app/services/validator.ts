import {FormGroup, ValidationErrors} from '@angular/forms';

export function samePlayerValidator(group: FormGroup): ValidationErrors | null {
  const playerA1 = group.get('playerA1').value;
  const playerA2 = group.get('playerA2').value;
  const playerB1 = group.get('playerB1').value;
  const playerB2 = group.get('playerB2').value;

  if (equals(playerA1, playerA2)
    || equals(playerA2, playerB1)
    || equals(playerB1, playerB2)
    || equals(playerA1, playerB1)
    || equals(playerA2, playerB2)
    || equals(playerA1, playerB2)) {
    return {samePlayer: true};
  }
  return null;
}

function equals(a, b): boolean {
  return a && a === b;
}
