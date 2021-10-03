type Error = {
  reason: string;
};

const CREDENTIALS_MISMATCH = 'Login or password is incorrect';

const ERRORS_TRANSLATE = {
  [CREDENTIALS_MISMATCH]: 'Логин или пароль неверны',
};

export const parseError = ({ reason }: Error): Error => {
  switch (reason) {
    case CREDENTIALS_MISMATCH:
      return { reason: ERRORS_TRANSLATE[CREDENTIALS_MISMATCH] };
    default:
      return { reason };
  }
};
