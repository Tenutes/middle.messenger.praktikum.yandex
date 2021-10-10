import Handlebars from 'handlebars';

Handlebars.registerHelper('times', function (n: number, block: { fn: (arg0: number) => string }) {
  let accum = '';
  for (let i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});

Handlebars.registerHelper('ismorezero', (value: number) => value > 0);

Handlebars.registerHelper('convert_message_date', (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU');
});

Handlebars.registerHelper('non_zero_length', (value: []) => value && value.length > 0);

Handlebars.registerHelper(
  'self_message',
  (userId: string | number, messageUserId: string | number) => userId === messageUserId
);

Handlebars.registerHelper('message_sended', (value: string) => value === 'sended');

Handlebars.registerHelper('message_recieved', (value: string) => value === 'recieved');

Handlebars.registerHelper('message_readed', (value: string) => value === 'readed');
