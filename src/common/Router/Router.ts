import Block from '../Block/Block';
import Route from './Route';

class Router {
  private routes: Route[] = [];
  private history = window.history;
  private currentRoute: Route | null = null;
  private readonly errorPageSymbol: string;

  constructor() {
    this.errorPageSymbol = '@@error@@';
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: '#root' });

    this.routes.push(route);

    return this;
  }

  errorPage(block: typeof Block) {
    const route = new Route(this.errorPageSymbol, block, { rootQuery: '#root' });
    this.routes.push(route);

    return this;
  }

  install() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

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

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
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
