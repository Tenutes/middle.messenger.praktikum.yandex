import Block from '../../../common/Block/Block';
import SearchTemplate from './search.hbs';
import compile from '../../../common/Renderer/compile';

export default class Search extends Block {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return compile(SearchTemplate, this.props);
  }
}
