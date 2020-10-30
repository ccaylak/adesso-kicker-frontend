export class TrackedStatistic {
  private _rank: number;
  private _rating: number;
  private _wins: number;
  private _losses: number;
  private _date: Date;

  get rank(): number {
    return this._rank;
  }

  get rating(): number {
    return this._rating;
  }

  get wins(): number {
    return this._wins;
  }

  get losses(): number {
    return this._losses;
  }

  get date(): Date {
    return this._date;
  }
}
