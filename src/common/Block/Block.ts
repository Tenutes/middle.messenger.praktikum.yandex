import EventBus from '../EventBus/EventBus';
import { EVENTS } from './constants';
import { uid, debounce } from '../helpers';
import Handlebars from 'handlebars';

interface RefElement extends HTMLElement {
  dataset: {
    ref: string;
  };
}

type RefsIndexed = {
  [key: string]: HTMLElement | Block;
};

export default class Block {
  _meta;
  props;
  state;
  eventBus: EventBus;
  domParser: DOMParser;
  id = uid();
  _element: Nullable<HTMLElement> = null;
  children: { [id: string]: Block } = {};
  refs: RefsIndexed = {};

  constructor(props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      props,
    };

    this.state = this.getStateFromProps();
    this.props = this._makePropsProxy(props);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = eventBus;
    this.domParser = new DOMParser();

    this._registerEvents();

    this.eventBus.emit(EVENTS.FLOW_CREATE);
    return this;
  }

  get element() {
    return this._element;
  }

  protected getStateFromProps(props?: {}): {} {
    return props || {};
  }

  _registerEvents() {
    // Делаем дебаунс, чтобы за раз обновился лишь раз
    const debouncedCDU = debounce(this._componentDidUpdate.bind(this), { wait: 1 });
    this.eventBus.on(EVENTS.FLOW_CREATE, this.init.bind(this));
    this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(EVENTS.FLOW_CDU, debouncedCDU);
    this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  init() {
    this._createResources();
    this.created();
    this.eventBus.emit(EVENTS.FLOW_RENDER);
  }

  created() {}

  _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentShouldUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentShouldUpdate(oldProps: unknown, newProps: unknown) {
    return Boolean(newProps) || Boolean(oldProps);
  }

  setProps(nextProps: StringRecord) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
    this._addCustomRefs();
  }

  render() {
    return '';
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(props?: unknown) {
    return props;
  }

  _makePropsProxy(props: StringRecord): {} {
    return new Proxy((props as unknown) as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        target[prop] = value;
        this.eventBus.emit(EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus.emit(EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _addCustomRefs() {
    const refs = (Array.from(this.element!.querySelectorAll('[data-ref]')) as unknown) as RefElement[];
    refs.forEach(el => {
      this.refs[el.dataset.ref] = el;
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      /**
       * Заменяем заглушку на component._element
       */
      stub.replaceWith(component.getContent());
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }
}
