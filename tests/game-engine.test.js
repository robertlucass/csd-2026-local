const gameEngine = require('@forca/engine/index');
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
    it('Deve retornar um objeto GameState válido', () => {
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
    it('Deveria aceitar gameState e parâmetros de letra', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'A');

      expect(updatedState).toHaveProperty('status');
      expect(updatedState).toHaveProperty('guesses');
      expect(updatedState.status).toBe('RUNNING');
    });

    it('Deveria diminuir as vidas por 1 quando a letra estiver errada', () => {
      // A palavra de teste é "CASA", então "Z" é um palpite errado
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'Z');

      expect(updatedState.lives).toBe(initialState.lives - 1);
    });

    it('Deveria adicionar a letra adivinhada a palpites', () => {
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
    it('Deveria retornar uma string de versão', () => {
      const version = gameEngine.version();
      expect(typeof version).toBe('string');
      expect(version.length).toBeGreaterThan(0);
    });
  });
});
