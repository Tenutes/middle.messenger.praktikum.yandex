import Block from './Block/Block';
import Handlebars, { HelperOptions } from 'handlebars';

export interface BlockConstructable<Props = unknown> {
  new (props: Props): Block<Props>;
  getName: () => string;
}

export default function register(Component: BlockConstructable) {
  Handlebars.registerHelper(Component.getName(), function ({ hash: { ref, ...opts }, data }: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const { children, refs } = data.root;
    const component = new Component(opts);

    children[component.id] = component;
    if (ref) {
      refs[ref] = component;
    }

    return `<div data-id="${component.id}"></div>`;
  });
}
