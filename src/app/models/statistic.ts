export class Statistic {
  private _rating: number;
  private _rank: number;
  private _wins: number;
  private _losses: number;

  get rating(): number {
    return this._rating;
  }

  get rank(): number {
    return this._rank;
  }

  get wins(): number {
    return this._wins;
  }

  get losses(): number {
    return this._losses;
  }

  get playedMatches(): number {
    return this._wins + this._losses;
  }

  get winRatio(): string {
    return ((this._wins / this.playedMatches) * 100).toFixed(1);
  }
}
