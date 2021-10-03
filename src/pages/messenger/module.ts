// import Store from '../../common/Store/Store';
// import { validateFormOnSubmit } from '../../common/Form/helpers';
// import { METHODS } from '../../common/Fetch/constants';
// import { required } from '../../common/Validator/Validator';
//
// const searchInput: HTMLInputElement | null = document.querySelector('input[type=search]');
// let searchInputLabel: HTMLLabelElement | null | undefined = searchInput?.parentElement?.querySelector('label');
// const chats: HTMLDivElement[] = Array.from(document.querySelectorAll('[data-chat]'));
// const chatMessages: HTMLParagraphElement[] = Array.from(document.querySelectorAll('[data-chat-message]'));
//
// const onSearchBlur = () => {
//   if (searchInputLabel && !searchInput?.value) {
//     searchInputLabel.classList.remove('opacity-0');
//   }
// };
//
// const onSearchFocus = () => {
//   if (searchInputLabel) {
//     searchInputLabel.classList.add('opacity-0');
//   }
// };
//
// const handleChatClick = (e: Event) => {
//   const chatId = Number((<HTMLDivElement>e.currentTarget)?.dataset?.chat);
//   if (chatId) {
//     console.log(chatId);
//   }
// };
//
// const handleChatDelete = (e: Event) => {
//   e.stopImmediatePropagation();
//   const target: HTMLButtonElement | null = <HTMLButtonElement>e.currentTarget;
//   const chatId = target?.dataset?.chatDelete;
//   if (chatId) {
//     console.log('Удаляем чат c id:', chatId);
//   }
// };
//
// const addChatFormEvents = async () => {
//   const chatForm: HTMLFormElement | null = document.querySelector('form#chat-form');
//   if (chatForm) {
//     const appendButtons: HTMLButtonElement[] = Array.from(chatForm.querySelectorAll('[data-chat-form-append]'));
//
//     appendButtons.forEach(button => {
//       button.addEventListener('click', handleAppendButtonClick);
//     });
//
//     if (chatForm) {
//       const validations = {
//         message: {
//           fn: required,
//         },
//       };
//       const formData = await validateFormOnSubmit(chatForm, validations).catch(() => {});
//       if (formData) {
//         const options = {
//           url: 'test/url',
//           options: {
//             method: METHODS.POST,
//           },
//         };
//       }
//     }
//   }
// };
//
// const addUserEvents = () => {
//   const getUserSettingsButton: HTMLButtonElement | null = document.querySelector('[data-chat-user-settings-button]');
//   const userSettings: HTMLElement | null = document.querySelector('[data-chat-user-settings]');
//
//   const onDocumentClick = (e: Event) => {
//     const closestSettings = (<Element>e?.target).closest('[data-chat-user-settings]');
//
//     if (!closestSettings) {
//       getUserSettingsButton?.click();
//       document.removeEventListener('click', onDocumentClick);
//     }
//   };
//
//   if (getUserSettingsButton) {
//     getUserSettingsButton.addEventListener('click', e => {
//       e.preventDefault();
//       e.stopImmediatePropagation();
//       getUserSettingsButton.classList.toggle('active');
//       userSettings?.classList.toggle('opacity-0');
//       userSettings?.classList.toggle('invisible');
//
//       if (getUserSettingsButton.classList.contains('active')) {
//         document.addEventListener('click', onDocumentClick);
//       }
//     });
//   }
// };
//
// const handleAppendButtonClick = (e: Event) => {
//   e.stopImmediatePropagation();
//   e.preventDefault();
//   const button = <HTMLButtonElement>e.currentTarget;
//   console.log('Прикрепляем: ', button?.dataset?.chatFormAppend);
// };
//
// export default () => {
//   if (searchInput) {
//     searchInput.addEventListener('focus', onSearchFocus);
//     searchInput.addEventListener('blur', onSearchBlur);
//   }
//
//   chatMessages.forEach(chatMessage => {
//     const messageHeight: number = chatMessage.offsetHeight;
//     const messageParagraph: HTMLParagraphElement | null = chatMessage.querySelector('p');
//
//     if (messageParagraph) {
//       let currentInnerText: string = messageParagraph.innerText.trim();
//       let removalAmountFromEnd = 1;
//       while (messageParagraph.offsetHeight > messageHeight) {
//         const newText: string = currentInnerText.slice(0, currentInnerText.length - removalAmountFromEnd).trim();
//         messageParagraph.innerText = `${newText}...`;
//         removalAmountFromEnd += 2;
//       }
//     }
//   });
//
//   chats.forEach(chat => {
//     chat.addEventListener('click', handleChatClick);
//     const deleteChatButton: HTMLButtonElement | null = chat.querySelector('[data-chat-delete]');
//     if (deleteChatButton) {
//       deleteChatButton.addEventListener('click', handleChatDelete);
//     }
//   });
// };
