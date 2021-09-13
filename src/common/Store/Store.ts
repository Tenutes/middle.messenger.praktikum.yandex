import Router from '../Router/Router';

class Store implements StateManager {
  state: Record<string, unknown>;

  constructor() {
    this.state = {};
  }

  install() {
    const currentPageState = Router.currentPage?.state;
    if (currentPageState) {
      this._setState(currentPageState);
    }
  }

  setState(state: State) {
    this._setState(state);
  }

  update(partialState: State) {
    this._setState({ ...this.state, ...partialState });
  }

  _setState(state: State) {
    this.state = state;
  }

  _use(store: State) {
    this.state = { ...store };
  }
}

export default new Store();
