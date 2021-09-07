export default {
  chatList: [
    {
      id: 1,
      user: { name: 'Андрей', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'not-self', message: 'Изображение', time: '10:49' },
      unread_count: 2,
    },
    {
      id: 2,
      user: { name: 'Киноклуб', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'self', message: 'стикер', time: '12:00' },
      unread_count: 0,
    },
    {
      id: 3,
      user: { name: 'Илья', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'not-self', message: 'Крутяк', time: 'Вчера' },
      unread_count: 0,
    },
    {
      id: 4,
      user: { name: 'Вадим', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'self', message: 'Да, давай', time: 'Пт' },
      unread_count: 3,
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
    },
    {
      id: 6,
      user: { name: 'Группа не анонимных анонимов', profile_image: '/img/empty-image.svg' },
      last_message: { type: 'not-self', message: 'Кажется, меня спалили, пока', time: '1 Апр 1996' },
      unread_count: 0,
    },
  ],
};
