import Link from '../../components/Link/link';
import Input from '../../components/Input/input';
import Search from '../../components/chat/Search/search';
import ChatUser from '../../components/chat/ChatUser/chat-user';

const linkProps: LinkProps = {
  href: '/settings/',
  label: 'Профиль',
  classes: 'inline-block decoration-none text-base text-gray hover:text-blue duration-200 arrowed',
};

const searchInputProps: InputProps = {
  type: 'search',
  name: 'search',
  required: false,
  id: 'search',
  classes: 'block w-full py-2 px-3 bg-white rounded-1 text-lg text-blue-dark',
};

const searchProps: SearchProps = {
  input: new Input(searchInputProps).getContent(),
};

const chats: Chat[] = [
  {
    id: 1,
    user: { name: 'Андрей', profile_image: '/img/empty-image.svg' },
    last_message: { type: 'not-self', message: 'Изображение', date: '10:49' },
    unread_count: 2,
    messageGroups: [
      {
        date: '19 июля',
        messages: [
          {
            type: 'not-self',
            message: 'Привет',
            date: '12:15',
          },
          {
            type: 'self',
            message: 'Привет парниша',
            date: '12:17',
            status: 'readed',
          },
        ],
      },
      {
        date: 'вчера',
        messages: [
          {
            type: 'not-self',
            date: '21:15',
            message:
              'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
              '\n' +
              'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          },
          {
            type: 'self',
            message: 'Круто',
            date: '21:25',
            status: 'recieved',
          },
          {
            type: 'self',
            message: 'Я за',
            date: '21:25',
            status: 'sended',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    user: { name: 'Киноклуб', profile_image: '/img/empty-image.svg' },
    last_message: { type: 'self', message: 'стикер', date: '12:00' },
    unread_count: 0,
    messageGroups: [
      {
        date: '19 июля',
        messages: [
          {
            type: 'not-self',
            message: 'Привет',
            date: '12:15',
          },
          {
            type: 'self',
            message: 'Привет парниша',
            date: '12:17',
            status: 'readed',
          },
        ],
      },
      {
        date: 'вчера',
        messages: [
          {
            type: 'not-self',
            date: '21:15',
            message:
              'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
              '\n' +
              'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          },
          {
            type: 'self',
            message: 'Круто',
            date: '21:25',
            status: 'recieved',
          },
          {
            type: 'self',
            message: 'Я за',
            date: '21:25',
            status: 'sended',
          },
        ],
      },
      {
        date: '19 июля',
        messages: [
          {
            type: 'not-self',
            message: 'Привет',
            date: '12:15',
          },
          {
            type: 'self',
            message: 'Привет парниша',
            date: '12:17',
            status: 'readed',
          },
        ],
      },
      {
        date: 'вчера',
        messages: [
          {
            type: 'not-self',
            date: '21:15',
            message:
              'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
              '\n' +
              'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          },
          {
            type: 'self',
            message: 'Круто',
            date: '21:25',
            status: 'recieved',
          },
          {
            type: 'self',
            message: 'Я за',
            date: '21:25',
            status: 'sended',
          },
        ],
      },
      {
        date: '19 июля',
        messages: [
          {
            type: 'not-self',
            message: 'Привет',
            date: '12:15',
          },
          {
            type: 'self',
            message: 'Привет парниша',
            date: '12:17',
            status: 'readed',
          },
        ],
      },
      {
        date: 'вчера',
        messages: [
          {
            type: 'not-self',
            date: '21:15',
            message:
              'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
              '\n' +
              'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          },
          {
            type: 'self',
            message: 'Круто',
            date: '21:25',
            status: 'recieved',
          },
          {
            type: 'self',
            message: 'Я за',
            date: '21:25',
            status: 'sended',
          },
        ],
      },
      {
        date: '19 июля',
        messages: [
          {
            type: 'not-self',
            message: 'Привет',
            date: '12:15',
          },
          {
            type: 'self',
            message: 'Привет парниша',
            date: '12:17',
            status: 'readed',
          },
        ],
      },
      {
        date: 'вчера',
        messages: [
          {
            type: 'not-self',
            date: '21:15',
            message:
              'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
              '\n' +
              'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
          },
          {
            type: 'self',
            message: 'Круто',
            date: '21:25',
            status: 'recieved',
          },
          {
            type: 'self',
            message: 'Я за',
            date: '21:25',
            status: 'sended',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    user: { name: 'Илья', profile_image: '/img/empty-image.svg' },
    last_message: { type: 'not-self', message: 'Крутяк', date: 'Вчера' },
    unread_count: 0,
    messageGroups: [],
  },
  {
    id: 4,
    user: { name: 'Вадим', profile_image: '/img/empty-image.svg' },
    last_message: { type: 'self', message: 'Да, давай', date: 'Пт' },
    unread_count: 3,
    messageGroups: [],
  },
  {
    id: 5,
    user: { name: 'Группа анонимных алкоголиков', profile_image: '/img/empty-image.svg' },
    last_message: {
      type: 'not-self',
      message: 'Друзья, у меня для вас особенный выпуск новостей! Он будет сегодня-завтра',
      date: 'Пт',
    },
    unread_count: 12,
    messageGroups: [],
  },
  {
    id: 6,
    user: { name: 'Группа не анонимных анонимов', profile_image: '/img/empty-image.svg' },
    last_message: { type: 'not-self', message: 'Кажется, меня спалили, пока', date: '1 Апр 1996' },
    unread_count: 0,
    messageGroups: [],
  },
];

const state: ChatProps = {
  link: new Link(linkProps).getContent(),
  search: new Search(searchProps).getContent(),
  currentChat: null,
  chats: chats.map(chat => new ChatUser(chat).getContent()),
  chatList: chats,
};

export default state;
