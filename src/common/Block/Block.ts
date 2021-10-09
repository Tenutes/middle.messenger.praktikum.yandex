import EventBus from '../EventBus/EventBus';
import { EVENTS } from './constants';
import { uid, debounce } from '../helpers';
import Handlebars from 'handlebars';
import isEqual from '../../utils/isEqual';

export default class Block<Props, Refs = null> {
  props: Props;
  state: Partial<Props>;
  refs: Refs;
  cdmTimeout: number | null;
  eventBus: EventBus;
  id = uid();
  _element: Nullable<HTMLElement> = null;
  children: { [id: string]: Block<Props> } = {};

  constructor(props: Props = {} as Props) {
    const eventBus = new EventBus();

    this.refs = {} as Refs;
    this.cdmTimeout = null;
    this.state = this.getStateFromProps();
    this.props = this._makePropsProxy(props);
    this.state = this._makePropsProxy(this.state as Props);

    this.eventBus = eventBus;

    this._registerEvents();

    this.eventBus.emit(EVENTS.FLOW_CREATE);
    return this;
  }

  get element() {
    return this._element;
  }

  protected getStateFromProps(props?: Props): Partial<Props> {
    return props || {};
  }

  _registerEvents() {
    // Делаем дебаунс, чтобы за раз обновился лишь раз
    const debouncedCDU = debounce(this._componentDidUpdate.bind(this), { wait: 15 });
    this.eventBus.on(EVENTS.FLOW_CREATE, this.init.bind(this));
    this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(EVENTS.FLOW_CWU, this.componentWillUpdate.bind(this));
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
    this.componentDidUpdate();
  }

  componentWillUpdate(_oldProps: unknown, _newProps: unknown) {}

  componentDidUpdate() {}

  componentShouldUpdate(oldProps: unknown, newProps: unknown) {
    return !isEqual((oldProps as {}) || {}, (newProps as {}) || {});
  }

  setProps(nextProps: unknown) {
    if (!nextProps) {
      return;
    }
    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);
    this.eventBus.emit(EVENTS.FLOW_CWU, oldProps, this.props);
    this.eventBus.emit(EVENTS.FLOW_CDU, oldProps, this.props);
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

  _makePropsProxy(props: Props): Props {
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        target[prop] = value;
        this.eventBus.emit(EVENTS.FLOW_CWU);
        this.eventBus.emit(EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as Props;
  }

  getContent(): HTMLElement | '' {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      this.cdmTimeout = window.setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus.emit(EVENTS.FLOW_CDM);
        }
      }, 1);
    }

    if (!this.element) {
      this.eventBus.emit(EVENTS.FLOW_CDM);

      return '';
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
    if (!this.element) {
      return;
    }

    const refs = Array.from(this.element?.querySelectorAll('[ref]'));
    refs.forEach(el => {
      const ref = el.getAttribute('ref');
      if (ref) {
        // @ts-ignore
        this.refs[ref] = el;
      }
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }
      stub.replaceWith(component.getContent());
    });

    return fragment.content;
  }
}
