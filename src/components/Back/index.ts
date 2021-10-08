import Block from '../../common/Block/Block';

interface BackProps {
  to: string;
  onClick: () => void;
}

export default class Back extends Block {
  constructor({ to, onClick }: BackProps) {
    super({ to, events: { click: onClick } });
  }

  static getName() {
    return 'Back';
  }

  render() {
    // language=hbs
    return `
      <a
        href="{{to}}"
        class="absolute top-0 left-0 bottom-0 flex items-center justify-center w-[64px] bg-blue-light text-blue hover:text-blue-dark border-r border-gray-light duration-200"
      >
        <svg class="block w-[28px] h-[28px]">
          <use href="/img/svg/sprite.svg#arrow-left"></use>
        </svg>
      </a>
    `;
  }
}
