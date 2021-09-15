import Handlebars from 'handlebars/dist/handlebars.runtime';

export const registerPartials = (partials: Record<string, TemplateFn | string>) => {
  Object.entries(partials).forEach(([key, fn]) => {
    Handlebars.registerPartial(key, fn);
  });
};
