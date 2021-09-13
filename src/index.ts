require('babel-polyfill');
import './assets/scss/app.scss';
import './helpers';

import { Renderer } from './common/Renderer/Renderer';
import { Router } from './common/Router/Router';
import { Store } from './common/Store/Store';
import routes from './routes';

/** Используется самописный роутер */
Router.use(routes).install();

/** Используется самописный state manager */
Store.install();

/** А так же рендерер для handlebars */
Renderer.renderTo('root');
