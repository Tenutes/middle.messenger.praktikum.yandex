import Block from '../../common/Block/Block';
import { UserData } from '../../api/AuthAPI';

export interface SearchResultProps {
  onUserClick: () => void;
  onAddUsers: ([]) => void;
  result: (UserData & { active: boolean })[];
}

export default class SearchResult extends Block {
  constructor(props: SearchResultProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
        <div>
            {{#each result}}
                {{{ ChatFoundUser hideOpts=true hideMessage=true user=this onClick=../onUserClick}}}
            {{/each}}
        </div>
    `;
  }
}
