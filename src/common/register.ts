import Block from './Block/Block';
import Handlebars, { HelperOptions } from 'handlebars';

export interface BlockConstructable<Props = unknown> {
  new (props: Props): Block;
}

export default function register(Component: BlockConstructable) {
  console.log('inner');
  console.log('registerType', Handlebars.registerHelper);
  Handlebars.registerHelper(Component.name, function ({ hash: { ref, ...opts }, data }: HelperOptions) {
    console.log('start to register');
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

    console.log('helper registered');
    return `<div data-id="${component.id}"></div>`;
  });
}
