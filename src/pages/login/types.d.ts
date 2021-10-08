import Router from '../../common/Router/Router';

export interface LoginProps extends StringRecord {
  user: User;
  router: Router;
}

type User = {
  profile: {
    [key in string]: unknown;
  };
};
