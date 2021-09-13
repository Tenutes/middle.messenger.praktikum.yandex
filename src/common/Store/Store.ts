import { Router } from '../Router/Router';

export const Store: StateManager = {
  state: {},

  install() {
    const currentPageState = Router.currentPage?.state;
    if (currentPageState) {
      this._setState(currentPageState);
    }
  },

  setState(state: State) {
    this._setState(state);
  },

  update(partialState: State) {
    this._setState({ ...this.state, ...partialState });
  },

  _setState(state: State) {
    this.state = state;
  },
  _use(store: State) {
    this.state = { ...store };
  },
};
