interface IBlock {
  _html: string;
  _meta: Record<string, unknown>;
  eventBus: () => IEventBus;
  props: Record<string, unknown>;

  _registerEvents(eventBus: IEventBus): void;

  init(): void;

  getContent(): strings;

  _componentDidMount(): void;

  componentDidMount(): void;

  _componentDidUpdate(oldProps, newProps): void;

  componentDidUpdate(newProps: Record<string, unknown>): boolean;
}
