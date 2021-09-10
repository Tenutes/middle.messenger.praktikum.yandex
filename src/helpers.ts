import Handlebars from 'handlebars/dist/handlebars.runtime';

export default () => {
  Handlebars.registerHelper('times', function(n: number, block: { fn: (arg0: number) => string }) {
    let accum = '';
    for (let i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });

  Handlebars.registerHelper('ismorezero', function(value: number) {
    return value > 0;
  });

  Handlebars.registerHelper('self_message', function(value: string) {
    return value === 'self';
  });

  Handlebars.registerHelper('message_sended', function(value: string) {
    return value === 'sended';
  });

  Handlebars.registerHelper('message_recieved', function(value: string) {
    return value === 'recieved';
  });

  Handlebars.registerHelper('message_readed', function(value: string) {
    return value === 'readed';
  });
};
