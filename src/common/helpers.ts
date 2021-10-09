import Router from './Router/Route';
import Block from './Block/Block';

export const identity = <T>(item: T) => item;

export const uid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function withRouter(Component: typeof Block): typeof Block {
  return class WithRouter extends Component<any, any> {
    constructor(props: any) {
      super({ ...props, router: Router });
    }
  };
}

type DebounceOptions = {
  wait?: number;
  maxWait?: number;
  before?: boolean;
  after?: boolean;
};

export const debounce = (fn: (...args: any) => void | unknown, options: DebounceOptions = {}) => {
  if (typeof fn !== 'function') {
    throw new TypeError(`Ожидал функцию, получил \`${typeof fn}\``);
  }

  const { wait = 0, maxWait = Infinity, before = false, after = true } = options;

  if (!before && !after) {
    throw new Error('И `before` и `after` = false, Функция никогда не вызовется.');
  }

  let timeout: NodeJS.Timeout | undefined;
  let maxTimeout: NodeJS.Timeout | undefined;
  let result: unknown;

  const debouncedFunction = function (this: typeof fn, ...args: []) {
    const context = this;

    const later = () => {
      timeout = undefined;

      if (maxTimeout) {
        clearTimeout(maxTimeout);
        maxTimeout = undefined;
      }

      if (after) {
        result = fn.apply(context, args);
      }
    };

    const maxLater = () => {
      maxTimeout = undefined;

      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      if (after) {
        result = fn.apply(context, args);
      }
    };

    const shouldCallNow = before && !timeout;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);

    if (maxWait > 0 && maxWait !== Infinity && !maxTimeout) {
      maxTimeout = setTimeout(maxLater, maxWait);
    }

    if (shouldCallNow) {
      result = fn.apply(context, args);
    }

    return result;
  };

  debouncedFunction.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    if (maxTimeout) {
      clearTimeout(maxTimeout);
      maxTimeout = undefined;
    }
  };

  return debouncedFunction;
};

export const isArray = (array: unknown): array is [] => Array.isArray(array);
