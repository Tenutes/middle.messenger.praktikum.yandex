import { Router } from '../Router/Router';

export const Store = {
  _state: {},
  get state() {
    return this._state;
  },

  install() {
    const currentPageState = Router.currentPage.state;
    this._setState(currentPageState);
  },

  _setState(state) {
    this._state = state;
  },
  _use(store) {
    this._state = { ...store };
  },
};
