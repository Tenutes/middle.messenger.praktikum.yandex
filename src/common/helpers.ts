import Block from './Block/Block';
import Router from './Router/Route';

export const identity = <T>(item: T) => item;

export const uid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function withRouter(Component: typeof Block) {
  return class WithRouter extends Component {
    constructor(props: any) {
      super({ ...props, router: Router });
    }
  };
}
