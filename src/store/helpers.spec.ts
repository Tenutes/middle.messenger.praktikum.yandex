import { parseError, Error, CREDENTIALS_MISMATCH } from './helpers';

describe('helpers', () => {
  it('should return original error value', () => {
    const error: Error = { reason: 'unrealReason' };

    const { reason } = parseError(error);

    expect(reason).toEqual(error.reason);
  });

  it('should return translated error value', () => {
    const error: Error = { reason: CREDENTIALS_MISMATCH };

    const { reason } = parseError(error);

    expect(reason).toEqual('Логин или пароль неверны');
  });
});
