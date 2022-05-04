export class Game {
  private rolls: number[] = new Array(23).fill(0);
  private currentRoll = 0;

  roll(pins: number) {
    if (!Number.isInteger(pins) || pins < 0 || pins > 10) {
      throw new RangeError('score should be an integer within 0 ~ 10');
    }
    if (this.currentRoll < 20 || (this.isStrike(9) && this.currentRoll < 23)) {
      this.rolls[this.currentRoll++] = pins;

      // Skip to next roll if this is a strike
      if (this.isStrike(Math.trunc(this.currentRoll / 2))) {
        this.currentRoll++
      }
    }
  }

  get score() {
    let score = 0;

    for (let frame = 0; frame < 10; frame++) {
      score += this.frameScore(frame);
    }

    return score;
  }

  private frameScore(frame: number): number {
    if (this.isStrike(frame)) {
      return this.rawFrameScore(frame) + this.strikeBonus(frame);
    } else if (this.isSpare(frame)) {
      return this.rawFrameScore(frame) + this.spareBonus(frame);
    } else {
      return this.rawFrameScore(frame);
    }
  }

  private rawFrameScore(frame: number): number {
    let r = frame * 2;
    let score1 = this.rolls[r];
    let score2 = this.rolls[r + 1];

    return Math.min(score1 + score2, 10);
  }

  private frameFirst(frame: number): number {
    let r = frame * 2;
    return this.rolls[r];
  }

  private isStrike(frame: number): boolean {
    return this.frameFirst(frame) === 10;
  }

  private isSpare(frame: number): boolean {
    return this.rawFrameScore(frame) === 10;
  }

  private strikeBonus(frame: number): number {
    if (this.isStrike(frame + 1)) {
      return this.rawFrameScore(frame + 1) + this.frameFirst(frame + 2);
    } else {
      return this.rawFrameScore(frame + 1)
    }
  }

  private spareBonus(frame: number): number {
    return this.frameFirst(frame + 1);
  }
}
