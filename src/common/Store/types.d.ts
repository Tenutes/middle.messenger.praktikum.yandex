interface State {
  [key: string]: unknown;
}

interface StateManager {
  _state: Record<string, unknown>;
  readonly state: Record<string, unknown>;

  install(): void;

  setState(state: State): void;

  update(partialState: State): void;

  _setState(state: State): void;

  _use(state: State): void;
}
