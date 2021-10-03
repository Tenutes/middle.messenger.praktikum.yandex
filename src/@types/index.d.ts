interface StringRecord {
  [key: string]: string;
}

interface IRegistry {
  instances: Record<string, Record<string, unknown>>;

  get(slug: string, selector: string): unknown | null;

  set(slug: string, selector: string, instance: unknown): Registry;

  forget(slug: string, selector: string): Registry;
}

interface IState {
  [key: string]: unknown;
}

type TemplateFn = (ctx: IState | null) => string;

interface ICurrentPage {
  state: IState;
  module: {
    component: typeof IBlock;
  };
}

type Nullable<T> = T | null;

declare module 'handlebars/dist/handlebars.runtime';
declare module '*.hbs';
