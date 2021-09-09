import { Router } from '../Router/Router';

export const Store: StateManager = {
  _state: {},
  get state() {
    return this._state;
  },

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
    this._state = state;
  },
  _use(store: State) {
    this._state = { ...store };
  },
};
