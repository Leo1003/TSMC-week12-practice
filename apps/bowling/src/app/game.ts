export class Game {
  private rolls: number[] = [];
  private currentRoll = 0;

  roll(pins: number) {
    this.rolls[this.currentRoll++] = pins;
  }

  get score() {
    let score = 0;
    let frameIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isSpare(frameIndex)) {
        score += 10 + this.rolls[frameIndex + 2];
      } else {
        score += this.rolls[frameIndex] + this.rolls[frameIndex + 1];
      }
      frameIndex += 2;
    }
    return score;
  }

  private isSpare(frameIndex: number) {
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10;
  }
}
