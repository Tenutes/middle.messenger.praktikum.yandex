import Block from './Block/Block';
import Handlebars from 'handlebars';

export interface BlockConstructable<Props = unknown> {
  new (props: Props): Block;
}

export default function register(Component: BlockConstructable) {
  Handlebars.registerHelper(Component.name, function ({ hash: { ref, ...opts }, data }) {
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
