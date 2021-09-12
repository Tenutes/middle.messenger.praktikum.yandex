import { Router } from '../Router/Router';
import { Store } from '../Store/Store';
import compile from './compile';

export const Renderer: Renderer = {
  _component: null,
  _module: null,
  _id: null,
  _el: null,

  renderTo(id) {
    this._setEl(id);
    this._setTemplate();
    this._insertTemplate();
  },

  prerender(partial, state) {
    if (!partial) {
      return '';
    }

    return compile(partial, state);
  },

  _setEl(id) {
    this._id = id;
    this._el = document.getElementById(id);
  },

  _setTemplate() {
    const { component, state, module } = Router.currentPage as ICurrentPage;
    this._component = component;
    this._module = module;
    Store.setState(state);
  },

  _insertTemplate() {
    if (this._el && this._component) {
      const componentInstance = new this._component(Store.state);
      this._el.innerHTML = componentInstance.getContent();
      if (this._module && typeof this._module === 'function') {
        this._module().then(({ default: fn }: { default: () => void }) => {
          typeof fn === 'function' && fn();
        });
      }
    } else {
      throw new Error(`There is no element with given id: ${this._id}`);
    }
  },
};
