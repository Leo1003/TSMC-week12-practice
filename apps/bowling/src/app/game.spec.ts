import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { TestBed } from '@angular/core/testing';
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

  test('perfect game', () => {
    rollMany(12, 10);
    expect(game.score).toBe(300);
  });

  test('unfinished game', () => {
    game.roll(6);
    game.roll(4);
    game.roll(9);
    game.roll(0);
    game.roll(10);
    game.roll(7);
    expect(game.score).toBe(52);
  });

  test('invalid values', () => {
    expect(() => game.roll(-1)).toThrow();
    expect(() => game.roll(0.5)).toThrow();
    expect(() => game.roll(-2.8)).toThrow();
    expect(() => game.roll(11)).toThrow();
    expect(() => game.roll(10.01)).toThrow();
    expect(() => game.roll(Infinity)).toThrow();
    expect(() => game.roll(NaN)).toThrow();
  })

  function rollMany(n: number, pins: number) {
    for (let i = 0; i < n; i++) {
      game.roll(pins);
    }
  }
});

