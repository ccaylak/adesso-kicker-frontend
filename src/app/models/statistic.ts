export class Statistic {
  private _rating: number;
  private _rank: number;
  private _wins: number;
  private _losses: number;

  constructor(rating: number, rank: number, wins: number, losses: number) {
    this._rating = rating;
    this._rank = rank;
    this._wins = wins;
    this._losses = losses;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(rating: number) {
    this._rating = rating;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(rank: number) {
    this._rank = rank;
  }

  get wins(): number {
    return this._wins;
  }

  set wins(wins: number) {
    this._wins = wins;
  }

  get losses(): number {
    return this._losses;
  }

  set losses(losses: number) {
    this._losses = losses;
  }

  get playedMatches(): number {
    return this._wins + this._losses;
  }

  get winRatio(): string {
    return ((this._wins / this.playedMatches) * 100).toFixed(1);
  }
}
