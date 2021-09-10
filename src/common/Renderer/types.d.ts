interface Renderer {
  _currentTemplate: TemplateFn | null;
  _module: unknown | null;
  _id: string | null;
  _el: HTMLElement | null;
  template: unknown | null;

  renderTo(id: string): void;

  prerender(partial: TemplateFn, state: State): string;

  _setEl(id: string): void;

  _setTemplate(): void;

  _insertTemplate(): void;
}
