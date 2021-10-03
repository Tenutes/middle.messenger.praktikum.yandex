import Block from '../../common/Block/Block';

interface SettingsProfileProps {
  name: string;
}

export default class SettingsProfile extends Block {
  constructor(props: SettingsProfileProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
        <div class="">
            <div class="rounded-full mb-4 w-[130px] h-[130px] bg-gray-lighten relative cursor-pointer hover:target:[data-target]:opacity-100 hover:shadow-sm">
                <div
                    data-target
                    class="z-10 opacity-0 duration-200 flex justify-center items-center absolute inset-0 rounded-full bg-icon"
                >
                    <p class="text-base text-black">Хочу другой</p>
                </div>
                <img
                        class="w-8 h-8 absolute top-1/2 left-1/2 transform-top-left-center"
                        src="/img/empty-image.svg"
                />
            </div>
            <h2 class="text-black font-semibold text-base text-center">{{name}}</h2>
        </div>
    `;
  }
}
