import Block from '../../../common/Block/Block';

interface PageProps {}

export class Page404 extends Block<PageProps> {
  render() {
    // language=hbs
    return `
        <div class="flex flex-col items-center justify-center w-full bg-blue-light h-screen justify-center">
            <h1 class="text-4xl font-medium mb-4">404</h1>
            <p class="text-xl mb-14 tracking-wide">Не туда попали</p>
            {{{ Link to='/messenger' label='К чатам' classes='text-blue decoration-none hover:underline duration-200' }}}
        </div>
    `;
  }
}
