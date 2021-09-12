interface State {
  [key: string]: unknown;
}

interface StateManager {
  state: Record<string, unknown>;

  install(): void;

  setState(state: State): void;

  update(partialState: State): void;

  _setState(state: State): void;

  _use(state: State): void;
}
