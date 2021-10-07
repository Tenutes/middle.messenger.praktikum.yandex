import user from './user';
import profile from './profile';
import messenger from './messenger';
import Store from '../common/Store/Store';
import Block from '../common/Block/Block';

export const store = new Store({
  user,
  profile,
  messenger,
});

export function connect(stateToProps: (state: any) => any, Component: typeof Block) {
  return class WithStore extends Component {
    constructor(props: any) {
      super({ ...props, ...stateToProps(store.getState()) });
    }

    componentDidMount(props: unknown) {
      super.componentDidMount(props);

      store.on('changed', () => {
        this.setProps({
          ...this.props,
          ...stateToProps(store.getState()),
        });
      });
    }
  };
}
