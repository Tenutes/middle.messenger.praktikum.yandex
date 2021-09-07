import { identity } from '../helpers';
import { DEFAULT_ROUTE_NAMES, SLASH_REMOVAL_REG } from './constants';

export const Router: Routes = {
  _currentPage: undefined,
  _path: '',
  _route: [],
  _routes: [],

  get currentPage() {
    return this._currentPage;
  },
  get path() {
    return this._path;
  },
  get route() {
    return this._route;
  },
  get routes() {
    return this._routes;
  },

  use(routes) {
    this._routes = routes;
    return this;
  },
  install() {
    this._parseAndWritePathAndRoute();
    this._setCurrentPage();
  },

  _parseAndWritePathAndRoute() {
    this._path = this._parseUrl();
    this._route = this._parsePath();
  },
  _parseUrl() {
    return location.pathname;
  },
  _parsePath() {
    return this.path.split('/').filter(identity);
  },
  _setCurrentPage() {
    const directRoute = this._removeTrailingSlashesFromRoute();
    this._currentPage = this._getRouteByPath(directRoute) || this._getDefaultRoute();
  },
  _getRouteByPath(route) {
    return this._routes.find(({ path }) => path.includes(route));
  },
  _getDefaultRoute() {
    return this._routes.find(({ path }) => DEFAULT_ROUTE_NAMES.includes(path));
  },
  _removeTrailingSlashesFromRoute() {
    const matches = this.path.match(SLASH_REMOVAL_REG);
    return matches ? matches[1] : '';
  },
};
