export class TrackedStatistic {
  private _rank: number;
  private _rating: number;
  private _wins: number;
  private _losses: number;
  private _date: Date;

  constructor(
    rank: number,
    rating: number,
    wins: number,
    losses: number,
    date: Date
  ) {
    this._rank = rank;
    this._rating = rating;
    this._wins = wins;
    this._losses = losses;
    this._date = date;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(rank: number) {
    this._rank = rank;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(rating: number) {
    this._rating = rating;
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

  get date(): Date {
    return this._date;
  }

  set date(date: Date) {
    this._date = date;
  }

  getWinRate(): number {
    return this._wins / this._losses;
  }

  getWinLoseDiff(): number {
    return this._wins - this._losses;
  }
}
