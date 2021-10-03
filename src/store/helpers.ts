type Error = {
  reason: string;
};

const CREDENTIALS_MISMATCH = 'Login or password is incorrect';
const USER_IN_SYSTEM = 'User already in system';
const COOKIE_NOT_VALID = 'Cookie is not valid';
const PASSWORD_IS_INVALID = 'Password is incorrect';

const ERRORS_TRANSLATE: Record<string, string> = {
  [CREDENTIALS_MISMATCH]: 'Логин или пароль неверны',
  [USER_IN_SYSTEM]: 'Такой пользователь уже в системе',
  [COOKIE_NOT_VALID]: 'Куки невалидна',
  [PASSWORD_IS_INVALID]: 'Старый пароль неверный',
};

export const parseError = ({ reason }: Error): Error => {
  return { reason: ERRORS_TRANSLATE[reason] || reason };
};
