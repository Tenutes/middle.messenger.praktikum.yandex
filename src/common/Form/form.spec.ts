/**
 * @jest-environment jsdom
 */
import Form from './Form';
import Input from '../../components/Input';

describe('Form', () => {
  it('should throw error with no element in DOM', () => {
    expect(() => new Form('invalid')).toThrow('There is no Form with id:invalid');
  });

  describe('From DOM manipulating', () => {
    let formInstance: Form;
    const originalGetDocumentById = document.getElementById;
    beforeEach(() => {
      document.getElementById = jest.fn(() => {
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.name = 'test';
        input.value = 'test';
        form.appendChild(input);
        return form;
      });
      formInstance = new Form('instance');
    });

    afterEach(() => {
      document.getElementById = originalGetDocumentById;
    });

    it('should return instance', () => {
      expect(formInstance).toBeInstanceOf(Form);
    });

    it('should return formData instance', () => {
      const formData = formInstance.getFormData();

      expect(formData).toBeInstanceOf(FormData);
    });

    it('should return form values', () => {
      const values = { test: 'test' };
      const formValues = formInstance.getValues();

      expect(formValues).toEqual(values);
    });

    it('should call addValidationField with field value', () => {
      const input = new Input({ type: 'type', name: 'name', id: 'test' });
      const spy = jest.spyOn(formInstance, 'addValidationField');
      formInstance.addValidationFields([input]);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(input);
    });
  });
});
