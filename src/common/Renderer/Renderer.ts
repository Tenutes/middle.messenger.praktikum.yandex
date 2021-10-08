import Router from '../Router/Router';
import Store from '../Store/Store';
import Block from '../../common/Block/Block.js';

class Renderer implements IRenderer {
  _module: unknown | null;
  _id: string | null;
  _el: HTMLElement | null;
  _component: typeof Block | null;

  constructor() {
    this._component = null;
    this._module = null;
    this._id = null;
    this._el = null;
  }

  renderTo(id: string) {
    this._setEl(id);
    this._setTemplate();
    this._insertTemplate();
  }

  _setEl(id: string) {
    this._id = id;
    this._el = document.getElementById(id);
  }

  _setTemplate() {
    const { component, state, module } = Router.currentPage as ICurrentPage;
    this._component = component;
    this._module = module;
    Store.setState(state);
  }

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
  }
}

export default new Renderer();
