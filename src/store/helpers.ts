export type Error = {
  reason: string;
};

export const CREDENTIALS_MISMATCH = 'Login or password is incorrect';
export const USER_IN_SYSTEM = 'User already in system';
export const COOKIE_NOT_VALID = 'Cookie is not valid';
export const PASSWORD_IS_INVALID = 'Password is incorrect';
export const EMAIL_DUPLICATE = 'Email already exists';
export const LOGIN_DUPLICATE = 'Login already exists';

const ERRORS_TRANSLATE: Record<string, string> = {
  [CREDENTIALS_MISMATCH]: 'Логин или пароль неверны',
  [USER_IN_SYSTEM]: 'Сначала выйдете из чата',
  [COOKIE_NOT_VALID]: 'Куки невалидна',
  [PASSWORD_IS_INVALID]: 'Старый пароль неверный',
  [EMAIL_DUPLICATE]: 'Такой email уже существует',
  [LOGIN_DUPLICATE]: 'Такой login уже существует',
};

export const parseError = ({ reason }: Error): Error => {
  return { reason: ERRORS_TRANSLATE[reason] || reason };
};
