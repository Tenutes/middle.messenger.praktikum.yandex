import Block from '../Block/Block';
import Route from './Route';

export type RouterBeforeEachFn = (next: () => void, route: Route | undefined) => void;

type RouteConfig = {
  block: typeof Block;
  meta?: {
    requireAuth: boolean;
  };
};

class Router {
  private routes: Route[] = [];
  private history = window.history;
  private currentRoute: Route | null = null;
  private readonly errorPageSymbol: string;
  onBeforeEach: RouterBeforeEachFn | undefined;

  constructor() {
    this.errorPageSymbol = '@@error@@';
  }

  get currentRoutes() {
    return this.routes;
  }

  use(pathname: string, { block, meta }: RouteConfig) {
    const route = new Route(pathname, block, { rootQuery: '#root', requireAuth: meta?.requireAuth || false });

    this.routes.push(route);

    return this;
  }

  errorPage(block: typeof Block) {
    const route = new Route(this.errorPageSymbol, block, { rootQuery: '#root', requireAuth: false });
    this.routes.push(route);

    return this;
  }

  install() {
    window.onpopstate = async () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (this.onBeforeEach) {
      return this.onBeforeEach(() => this._onRoutePass(route, pathname), route);
    }

    return this._onRoutePass(route, pathname);
  }

  _onRoutePass(route: Route | undefined, pathname: string) {
    if (!route) {
      if (pathname !== this.errorPageSymbol) {
        this._onRoute(this.errorPageSymbol);
      }
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  beforeEach(func: RouterBeforeEachFn) {
    this.onBeforeEach = func;

    return this;
  }

  async go(pathname: string) {
    this.history.pushState({}, '', pathname);
    await this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}

export default new Router();
