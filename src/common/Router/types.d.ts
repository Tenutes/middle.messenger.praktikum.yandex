interface Route {
  path: string;
  component: typeof IBlock;
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

  use(routes: Route[]): Routes;

  install(): void;

  _setCurrentPage(): void;

  _parseAndWritePathAndRoute(): void;

  _getRouteByPath(route: string): Route | undefined;

  _parseUrl(): string;

  _removeTrailingSlashesFromRoute(): string;

  _parsePath(): string[];

  _getDefaultRoute(): Route | undefined;
}
