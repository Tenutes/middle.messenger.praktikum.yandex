import Form from './Form';

export const onBlur = (e: Event) => {
  const form = (e.target as HTMLInputElement).closest('form');

  if (form) {
    const FormClass = Form.get(form.id);
    // Пока form.id - не уникально, в связи с ререндером, то Registry будет возвращать старое значение,
    // которого нет в DOM (возможно), надо переписать .get у Form, чтоб он еще проверил наличие Form в DOM
    FormClass.validateField(e.target as FormElement);
  }
};

export const onFocus = (e: Event) => {
  const form = (e.target as HTMLInputElement).closest('form');

  if (form) {
    const FormClass = Form.get(form.id);
    FormClass.hideError((e.target as HTMLInputElement).name);
  }
};
