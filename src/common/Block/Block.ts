import EventBus from '../EventBus/EventBus';
import { EVENTS } from './constants';

export default class Block implements IBlock {
  _html: string;
  _meta;
  props;
  eventBus: () => EventBus;

  constructor(props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      props,
    };

    this._html = '';
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);

    return this;
  }

  _registerEvents(eventBus: IEventBus) {
    eventBus.on(EVENTS.INIT, this.init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidUpdate(newProps: Record<string, unknown>) {
    const response = this.componentDidUpdate(newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(newProps: Record<string, unknown>) {
    return Boolean(newProps);
  }

  setProps(nextProps: Record<string, unknown>) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  _render() {
    this._html = this.render();
  }

  render() {
    return '';
  }

  _makePropsProxy(props: Record<string, unknown>) {
    const _this = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;

        _this.eventBus().emit(EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  getContent() {
    return this._html;
  }
}
