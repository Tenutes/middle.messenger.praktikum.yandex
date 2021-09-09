import { Store } from '../../common/Store/Store';
import { Renderer } from '../../common/Renderer/Renderer';
import ChatPartial from '../../components/chat/chat.hbs';

const searchInput: HTMLInputElement | null = document.querySelector('input[type=search]');
let searchInputLabel: HTMLLabelElement | null | undefined = searchInput?.parentElement?.querySelector('label');
const chats: HTMLDivElement[] = Array.from(document.querySelectorAll('[data-chat]'));
const chatMessages: HTMLParagraphElement[] = Array.from(document.querySelectorAll('[data-chat-message]'));
const chatContainer = document.querySelector('[data-chat-container]');

const onSearchBlur = () => {
  if (searchInputLabel && !searchInput?.value) {
    searchInputLabel.classList.remove('opacity-0');
  }
};

const onSearchFocus = () => {
  if (searchInputLabel) {
    searchInputLabel.classList.add('opacity-0');
  }
};

const handleChatClick = (e: Event) => {
  const chatId = Number((<HTMLDivElement>e.currentTarget)?.dataset?.chat);
  if (chatId) {
    const chat = (<ChatState>Store.state).chatList.find(({ id }) => id === chatId);
    if (chat) {
      Store.update({ currentChat: chat });
      renderChat(chat);
    }
  }
};

const renderChat = (chat: State) => {
  const template = Renderer.prerender(ChatPartial, chat);
  if (chatContainer) {
    chatContainer.innerHTML = template;
  }
};

export default () => {
  if (searchInput) {
    searchInput.addEventListener('focus', onSearchFocus);
    searchInput.addEventListener('blur', onSearchBlur);
  }

  chatMessages.forEach(chatMessage => {
    const messageHeight: number = chatMessage.offsetHeight;
    const messageParagraph: HTMLParagraphElement | null = chatMessage.querySelector('p');

    if (messageParagraph) {
      let currentInnerText: string = messageParagraph.innerText.trim();
      let removalAmountFromEnd = 1;
      while (messageParagraph.offsetHeight > messageHeight) {
        const newText: string = currentInnerText.slice(0, currentInnerText.length - removalAmountFromEnd).trim();
        messageParagraph.innerText = `${newText}...`;
        removalAmountFromEnd += 2;
      }
    }
  });

  chats.forEach(chat => {
    chat.addEventListener('click', handleChatClick);
  });
};
