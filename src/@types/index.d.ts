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
  component: typeof IBlock;

  module(ctx: Istate): string;
}

declare module 'handlebars/dist/handlebars.runtime';

declare function HbsTemplateFn(context: IState | null, options?: unknown): string;

declare module '*.hbs' {
  export default HbsTemplateFn;
}
