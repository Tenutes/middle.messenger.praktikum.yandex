interface Renderer {
  _currentTemplate: TemplateFn | null;
  _ctx: IState | null;
  _module: unknown | null;
  _id: string | null;
  _el: HTMLElement | null;
  template: unknown | null;
  ctx: IState | null;

  renderTo(id: string): void;

  _setEl(id: string): void;

  _setTemplate(): void;

  _insertTemplate(): void;
}

interface StringRecord {
  [key: string]: string;
}

interface IForm {
  id: string;
  form: HTMLFormElement;
  values: StringRecord;
  errors: StringRecord;

  getValues(id: string): Record<string, string>;

  getFormData(): FormData | null;

  isValid(): boolean;

  clear(): void;

  hideErrors(): void;

  hideError(name: string): void;

  showError(name: string, message: string): void;

  generateErrorLabel(name: string, message: string): HTMLElement;
}

interface IRegistry {
  instances: Record<string, Record<string, unknown>>;
  get: (slug: string, selector: string) => unknown | null;
  set: (slug: string, selector: string, instance: unknown) => Registry;
  forget: (slug: string, selector: string) => Registry;
}

interface IState {
  [key: string]: unknown;
}

interface Route {
  path: string;
  template: unknown;
  state?: { [key: string]: unknown };
  module?: unknown;
}

interface Routes {
  _currentPage: Route | undefined;
  _path: string;
  _route: string[];
  _routes: Route[];
  currentPage: Route | undefined;
  path: string;
  route: string[];
  routes: Route[];
  use: (routes: Route[]) => Routes;
  install: () => void;
  _setCurrentPage: () => void;
  _parseAndWritePathAndRoute: () => void;
  _getRouteByPath: (route: string) => Route | undefined;
  _parseUrl: () => string;
  _removeTrailingSlashesFromRoute: () => string;
  _parsePath: () => string[];
  _getDefaultRoute: () => Route | undefined;
}

type TemplateFn = (ctx: IState | null) => string;

interface ICurrentPage {
  state: IState;
  template: TemplateFn;

  module(ctx: Istate): string;
}

declare module 'handlebars/dist/handlebars.runtime';

declare function HbsTemplateFn(context: IState | null, options?: unknown): string;

declare module '*.hbs' {
  export default HbsTemplateFn;
}
