export class Game {
  private _score = 0;

  roll(pins: number) {
    this._score += pins;
  }

  get score() {
    return this._score;
  }
}
