import { Router } from '../Router/Router';
import compile from './compile';

export const Renderer = {
  _currentTemplate: null,
  _ctx: null,
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
    this._currentTemplate = Router.currentPage.template;
  },
  _insertTemplate() {
    if (this._el) {
      this._el.innerHTML = compile(this._currentTemplate, this._ctx);
    } else {
      throw new Error(`There is no element with given id: ${this._id}`);
    }
  },
};
