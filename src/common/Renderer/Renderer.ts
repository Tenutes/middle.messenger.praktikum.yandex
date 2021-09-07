import { Router } from '../Router/Router';
import compile from './compile';

export const Renderer: Renderer = {
  _currentTemplate: null,
  _ctx: null,
  _module: null,
  _id: null,
  _el: null,

  get template() {
    return this._currentTemplate;
  },
  get ctx() {
    return this._ctx;
  },

  renderTo(id) {
    this._setEl(id);
    this._setTemplate();
    this._insertTemplate();
  },

  _setEl(id) {
    this._id = id;
    this._el = document.getElementById(id);
  },
  _setTemplate() {
    const { template, state, module } = Router.currentPage as ICurrentPage;
    this._currentTemplate = template;
    this._ctx = state;
    this._module = module;
  },
  _insertTemplate() {
    if (this._el && this._currentTemplate) {
      this._el.innerHTML = compile(this._currentTemplate, this._ctx);
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
