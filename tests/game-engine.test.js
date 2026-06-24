const gameEngine = require('@forca/engine');
const Config = require('@forca/engine/config');
const TestDictionary = require('./helpers/test-dictionary');

/**
 * Basic tests for GameEngine interface
 */

describe('GameEngine Interface', () => {
  beforeAll(() => {
    const testDictionary = new TestDictionary('CASA');
    Config.setDictionaryAdapter(testDictionary);
  });

  describe('startGame()', () => {
    it('should return a valid GameState object', () => {
      const gameState = gameEngine.startGame();

      expect(gameState).toHaveProperty('status');
      expect(gameState).toHaveProperty('word');
      expect(gameState).toHaveProperty('lives');
      expect(gameState).toHaveProperty('display_word');
      expect(gameState).toHaveProperty('guesses');
      expect(gameState).toHaveProperty('message');
      expect(Array.isArray(gameState.guesses)).toBe(true);
    });

  });

  describe('guessLetter()', () => {
    it('should accept gameState and letter parameters', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'A');

      expect(updatedState).toHaveProperty('status');
      expect(updatedState).toHaveProperty('guesses');
      expect(updatedState.status).toBe('RUNNING');
    });

    it('should decrease lives by 1 when the letter is wrong', () => {
      // A palavra de teste é "CASA", então "Z" é um palpite errado
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'Z');

      expect(updatedState.lives).toBe(initialState.lives - 1);
    });

    it('should add the guessed letter to guesses', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'Z');

      expect(updatedState.guesses).toContain('Z');
    });

    it('Vida igual a 0. Você perdeu!', () => {
      const initialState = gameEngine.startGame();

      const updatedState = gameEngine.guessLetter(initialState, 'T');
      const updatedState1 = gameEngine.guessLetter(updatedState, 'H');
      const updatedState2 = gameEngine.guessLetter(updatedState1, 'M');
      const updatedState3 = gameEngine.guessLetter(updatedState2, 'X');
      const updatedState4 = gameEngine.guessLetter(updatedState3, 'L');
      const updatedState5 = gameEngine.guessLetter(updatedState4, 'Q');

      expect(updatedState5.lives).toBe(0);
      expect(updatedState5.status).toBe('LOST');
    });

    it('Você Ganhou!', () => {
      const initialState = gameEngine.startGame();

      const updatedState = gameEngine.guessLetter(initialState, 'C');
      const updatedState1 = gameEngine.guessLetter(updatedState, 'A');
      const updatedState2 = gameEngine.guessLetter(updatedState1, 'S');

      expect(updatedState2.status).toBe('WON');
    });
  });

  describe('version()', () => {
    it('should return a version string', () => {
      const version = gameEngine.version();
      expect(typeof version).toBe('string');
      expect(version.length).toBeGreaterThan(0);
    });
  });
});
