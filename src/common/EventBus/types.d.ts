interface IEventBus {
  listeners: Record<string, EventBusListener[]>;

  on(event: string, callback): void;

  off(event: string, callback): void;

  emit(event: string, ...args: unknown[]): void;
}

type EventBusListener = (...args: unknown) => unknown;
