import './assets/scss/app.scss';
import { Renderer } from './common/Renderer/Renderer';
import { Router } from './common/Router/Router';
import routes from './routes';

/** Используется самописный роутер */
Router.use(routes).install();

/** А так же рендерер для handlebars */
Renderer.renderTo('root');
