import { isArray, identity, uid, debounce } from './helpers';

describe('helpers', () => {
  describe('isArray', () => {
    it('should return false', () => {
      const notArray = 'i am array';

      const result = isArray(notArray);

      expect(result).toBe(false);
    });

    it('should return true', () => {
      const array = ['i am array'];

      const result = isArray(array);

      expect(result).toBe(true);
    });
  });

  describe('identity', () => {
    it('should return same object', () => {
      const object = { return: 'me' };

      const result = identity(object);

      expect(result).toEqual(object);
    });
  });

  describe('uid', () => {
    it('should return string', () => {
      const result = uid();

      expect(typeof result).toBe('string');
    });

    it('should return different results', () => {
      const result1 = uid();
      const result2 = uid();

      expect(result1).not.toEqual(result2);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();
    let func: jest.Mock;
    let debouncedFunc: Function;

    beforeEach(() => {
      func = jest.fn();
      debouncedFunc = debounce(func, { wait: 1000 });
    });

    it('should return new function', () => {
      expect(typeof debouncedFunc).toBe('function');
      expect(debouncedFunc).not.toEqual(func);
    });

    test('should be executed once', () => {
      for (let i = 0; i < 10; i++) {
        debouncedFunc();
      }

      jest.runAllTimers();

      expect(func).toBeCalledTimes(1);
    });
  });
});
