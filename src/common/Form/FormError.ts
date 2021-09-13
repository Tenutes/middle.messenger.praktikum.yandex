class FormError implements IFormError {
  classNames = ['error', 'absolute', 'text-[9px]', 'top-[calc(100%+2px)]', 'left-0', 'text-red', 'leading-none'];

  render(fieldName: string, messageTemplate: string) {
    const node = document.createElement('label');
    node.setAttribute('for', fieldName);
    node.setAttribute('generated', 'true');
    node.classList.add(...this.classNames);
    node.innerText = messageTemplate;

    return node;
  }
}

export default new FormError();
