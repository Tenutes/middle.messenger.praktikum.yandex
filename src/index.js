"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./assets/scss/app.scss");
const Renderer_1 = require("./common/Renderer/Renderer");
const Router_1 = require("./common/Router/Router");
const Store_1 = require("./common/Store/Store");
const helpers_1 = __importDefault(require("./helpers"));
const partials_1 = __importDefault(require("./partials"));
const routes_1 = __importDefault(require("./routes"));
/** Регистрируем partial's */
(0, partials_1.default)();
/** Регистрируем helper's */
(0, helpers_1.default)();
/** Используется самописный роутер */
Router_1.Router.use(routes_1.default).install();
/** Используется самописный state manager */
Store_1.Store.install();
/** А так же рендерер для handlebars */
Renderer_1.Renderer.renderTo('root');
