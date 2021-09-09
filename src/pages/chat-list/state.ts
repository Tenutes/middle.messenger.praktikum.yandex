const state: ChatState = {
  currentChat: null,
  chatList: [
    {
      id: 1,
      user: { name: 'Андрей', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'not-self', message: 'Изображение', time: '10:49' },
      unread_count: 2,
      messages: [
        {
          date: '19 июля',
          messages: [
            {
              type: 'not-self',
              message: 'Привет',
            },
            {
              type: 'self',
              message: 'Привет парниша',
            },
          ],
        },
        {
          date: 'вчера',
          messages: [
            {
              type: 'not-self',
              message:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
                '\n' +
                'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
            },
            {
              type: 'self',
              message: 'Круто',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      user: { name: 'Киноклуб', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'self', message: 'стикер', time: '12:00' },
      unread_count: 0,
      messages: [],
    },
    {
      id: 3,
      user: { name: 'Илья', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'not-self', message: 'Крутяк', time: 'Вчера' },
      unread_count: 0,
      messages: [],
    },
    {
      id: 4,
      user: { name: 'Вадим', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'self', message: 'Да, давай', time: 'Пт' },
      unread_count: 3,
      messages: [],
    },
    {
      id: 5,
      user: { name: 'Группа анонимных алкоголиков', profile_image: '/img/empty-image.svg' },
      last_message: {
        type: 'not-self',
        message: 'Друзья, у меня для вас особенный выпуск новостей! Он будет сегодня-завтра',
        time: 'Пт',
      },
      unread_count: 12,
      messages: [],
    },
    {
      id: 6,
      user: { name: 'Группа не анонимных анонимов', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'not-self', message: 'Кажется, меня спалили, пока', time: '1 Апр 1996' },
      unread_count: 0,
      messages: [],
    },
  ],
};

export default state;
