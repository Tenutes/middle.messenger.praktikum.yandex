import './assets/scss/app.scss';
import { Renderer } from './common/Renderer/Renderer';
import { Router } from './common/Router/Router';
import { Store } from './common/Store/Store';
import loadHelpers from './helpers';
import loadPartials from './partials';
import routes from './routes';

/** Регистрируем partial's */
loadPartials();
/** Регистрируем helper's */
loadHelpers();

/** Используется самописный роутер */
Router.use(routes).install();

/** Используется самописный state manager */
Store.install();

/** А так же рендерер для handlebars */
Renderer.renderTo('root');
