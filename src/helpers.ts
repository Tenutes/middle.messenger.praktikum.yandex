import Handlebars from 'handlebars/dist/handlebars.runtime';

export default () => {
  Handlebars.registerHelper('times', function(n: number, block: { fn: (arg0: number) => string }) {
    let accum = '';
    for (let i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });
};
