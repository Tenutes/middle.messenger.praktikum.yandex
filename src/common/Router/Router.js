"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const helpers_1 = require("../helpers");
const constants_1 = require("./constants");
exports.Router = {
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
        return this.path.split('/').filter(helpers_1.identity);
    },
    _setCurrentPage() {
        const directRoute = this._removeTrailingSlashesFromRoute();
        this._currentPage = this._getRouteByPath(directRoute) || this._getDefaultRoute();
    },
    _getRouteByPath(route) {
        return this._routes.find(({ path }) => path.includes(route));
    },
    _getDefaultRoute() {
        return this._routes.find(({ path }) => constants_1.DEFAULT_ROUTE_NAMES.includes(path));
    },
    _removeTrailingSlashesFromRoute() {
        const matches = this.path.match(constants_1.SLASH_REMOVAL_REG);
        return matches ? matches[1] : '';
    },
};
