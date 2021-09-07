const searchInput: HTMLInputElement | null = document.querySelector('input[type=search]');
let searchInputLabel: HTMLLabelElement | null | undefined = searchInput?.parentElement?.querySelector('label');
const chatMessages: HTMLParagraphElement[] = Array.from(document.querySelectorAll('[data-chat-message]'));

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
};
