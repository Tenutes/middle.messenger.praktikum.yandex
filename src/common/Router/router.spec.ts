/**
 * @jest-environment jsdom
 */
import Block from '../Block/Block';
import Router from './Router';

class TestPage extends Block {
  constructor() {
    super();
  }

  render() {
    return '';
  }
}

describe('Router', () => {
  const history = window.history;
  let TestRouter: typeof Router;
  beforeAll(() => {
    Object.defineProperty(window, 'history', {});
  });

  beforeEach(() => {
    TestRouter = require('./Router').default;
  });

  afterEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    Object.defineProperty(window, 'history', history);
  });

  it('should add Route', () => {
    TestRouter.use('/', { block: TestPage });

    expect(TestRouter.currentRoutes).toHaveLength(1);
  });

  it('should add ErrorPage', () => {
    TestRouter.errorPage(TestPage);

    expect(TestRouter.currentRoutes).toHaveLength(1);
  });

  it('adds BeforeEach hook', () => {
    TestRouter.use('/', { block: TestPage });
    const route = TestRouter.getRoute('/');

    expect(route).toBeTruthy();
  });

  it('get correct route', () => {
    const beforeEach = () => ({});

    TestRouter.beforeEach(beforeEach);

    expect(TestRouter.onBeforeEach).toBe(beforeEach);
  });

  it('should add onPopstateEvent', () => {
    TestRouter.install();

    expect(window.onpopstate).not.toBeNull();
  });
});
