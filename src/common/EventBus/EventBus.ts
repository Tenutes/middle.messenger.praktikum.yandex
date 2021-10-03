export default class EventBus implements IEventBus {
  listeners: Record<string, EventBusListener[]> = {};

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventBusListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventBusListener) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener: EventBusListener) => {
      listener(...args);
    });
  }
}
