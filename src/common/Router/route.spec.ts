/**
 * @jest-environment jsdom
 */
import Route from './Route';
import Block from '../Block/Block';

class TestBlock extends Block {
  constructor() {
    super();
  }

  render() {
    return '';
  }
}

describe('Route', () => {
  let route = new Route('/', TestBlock, {});

  it('should match TestPage', () => {
    const pathname = '/';

    const result = route.match(pathname);

    expect(result).toBe(true);
  });

  it('should call render on navigate', () => {
    const pathname = '/';
    const originalRender = route.render;
    route.render = jest.fn();
    const spy = jest.spyOn(route, 'render');

    route.navigate(pathname);

    expect(spy).toHaveBeenCalled();
    route.render = originalRender;
  });

  it('should not call render on navigate', () => {
    const pathname = 'error-route';
    const originalRender = route.render;
    route.render = jest.fn();
    const spy = jest.spyOn(route, 'render');

    route.navigate(pathname);

    expect(spy).not.toHaveBeenCalled();
    route.render = originalRender;
  });

  it('should throw error with no root', () => {
    expect(() => route.render()).toThrow('Root not found');
  });
});
