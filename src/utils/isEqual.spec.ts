import isEqual, { isPlainObject, isArrayOrObject } from './isEqual';

describe('isEqual', () => {
  it('should be equal', () => {
    const object = { test: 'me' };
    const anotherObject = { test: 'me' };

    const result = isEqual(object, anotherObject);

    expect(result).toBe(true);
  });

  it('should not be equal', () => {
    const object = { test: 'me' };
    const anotherObject = { test: 'you' };

    const result = isEqual(object, anotherObject);

    expect(result).toBe(false);
  });

  describe('isPlainObject', () => {
    it('should return false', () => {
      const falsy = false;

      const result = isPlainObject(falsy);

      expect(result).toBe(false);
    });

    it('should return true', () => {
      const truthy = { some: 'prop' };

      const result = isPlainObject(truthy);

      expect(result).toBe(true);
    });
  });

  describe('isArrayOrObject', () => {
    it('should return false', () => {
      const falsy = false;

      const result = isArrayOrObject(falsy);

      expect(result).toBe(false);
    });

    it('should return true from object', () => {
      const truthy = { some: 'prop' };

      const result = isArrayOrObject(truthy);

      expect(result).toBe(true);
    });

    it('should return true from array', () => {
      const truthy = ['some', 'prop'];

      const result = isArrayOrObject(truthy);

      expect(result).toBe(true);
    });
  });
});
