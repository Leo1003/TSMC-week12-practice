import { Game } from './game';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it('should create an instance', () => {
    expect(game).toBeTruthy();
  });

  test('all zero', () => {
    rollMany(20, 0);
    expect(game.score).toBe(0);
  });

  test('all one', () => {
    rollMany(20, 1);
    expect(game.score).toBe(20);
  });

  test('test on one spare', () => {
    game.roll(5);
    game.roll(5); // spare
    game.roll(3);
    rollMany(17, 0);
    expect(game.score).toBe(16);
  });

  test('test on one strike', () => {
    game.roll(10); // strike
    game.roll(3);
    game.roll(4);
    rollMany(17, 0);
    expect(game.score).toBe(24);
  });

  function rollMany(n: number, pins: number) {
    for (let i = 0; i < n; i++) {
      game.roll(pins);
    }
  }
});

