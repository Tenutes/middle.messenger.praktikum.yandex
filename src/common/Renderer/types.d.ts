interface Renderer {
  _component: typeof IBlock | null;
  _module: unknown | null;
  _id: string | null;
  _el: HTMLElement | null;

  renderTo(id: string): void;

  prerender(partial: TemplateFn, state: State): string;

  _setEl(id: string): void;

  _setTemplate(): void;

  _insertTemplate(): void;
}
