import { Router } from '../Router/Router';

interface State {
  [key: string]: unknown;
}

export const Store = {
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

  _setState(state: State) {
    this._state = state;
  },
  _use(store: State) {
    this._state = { ...store };
  },
};
