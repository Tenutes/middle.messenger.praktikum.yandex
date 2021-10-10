/**
 * @jest-environment jsdom
 */
import Validator, { required, equalsTo, match } from './Validator';

describe('Validator', () => {
  describe('Utils required', () => {
    it('should not return success result on required', () => {
      const FAKE_VALUE = false;

      const { success } = required(FAKE_VALUE);

      expect(success).toBeFalsy();
    });

    it('should return success result on required', () => {
      const FAKE_VALUE = 0;

      const { success } = required(FAKE_VALUE);

      expect(success).toBeTruthy();
    });
  });

  describe('Utils equalsTo', () => {
    it('should not return success result', () => {
      const fromInput = document.createElement('input');
      const toInput = document.createElement('input');
      fromInput.value = 'test';
      toInput.value = 'test1';

      const { success } = equalsTo(fromInput, toInput);

      expect(success).toBeFalsy();
    });

    it('should return success result using inputs', () => {
      const fromInput = document.createElement('input');
      const toInput = document.createElement('input');
      fromInput.value = 'test';
      toInput.value = 'test';

      const { success } = equalsTo(fromInput, toInput);

      expect(success).toBeTruthy();
    });

    it('should not return success result using checkboxes', () => {
      const fromInput = document.createElement('input');
      const toInput = document.createElement('input');
      fromInput.type = 'checkbox';
      toInput.type = 'checkbox';
      fromInput.checked = true;
      toInput.checked = false;

      const { success } = equalsTo(fromInput, toInput);

      expect(success).toBeFalsy();
    });

    it('should return success result using checkboxes', () => {
      const fromInput = document.createElement('input');
      const toInput = document.createElement('input');
      fromInput.type = 'checkbox';
      toInput.type = 'checkbox';
      fromInput.checked = true;
      toInput.checked = true;

      const { success } = equalsTo(fromInput, toInput);

      expect(success).toBeTruthy();
    });

    it('should not return success result using textarea', () => {
      const fromTextarea = document.createElement('textarea');
      const toTextarea = document.createElement('textarea');
      fromTextarea.value = 'fake text';
      const { success } = equalsTo(fromTextarea, toTextarea);

      expect(success).toBeFalsy();
    });

    it('should return success result using textarea', () => {
      const fromTextarea = document.createElement('textarea');
      const toTextarea = document.createElement('textarea');
      fromTextarea.value = 'fake text';
      toTextarea.value = 'fake text';

      const { success } = equalsTo(fromTextarea, toTextarea);

      expect(success).toBeTruthy();
    });

    it('should not return success result using select', () => {
      const fromSelect = document.createElement('select');
      const option = document.createElement('option');
      const toSelect = document.createElement('select');
      option.value = 'fake text';
      fromSelect.appendChild(option);
      fromSelect.value = 'fake text';
      const { success } = equalsTo(fromSelect, toSelect);

      expect(success).toBeFalsy();
    });

    it('should return success result using select', () => {
      const fromSelect = document.createElement('select');
      const fromOption = document.createElement('option');
      const toSelect = document.createElement('select');
      const toOption = document.createElement('option');
      fromOption.value = 'fake text';
      toOption.value = 'fake text';
      fromSelect.appendChild(fromOption);
      toSelect.appendChild(toOption);
      fromSelect.value = 'fake text';
      toSelect.value = 'fake text';

      const { success } = equalsTo(fromSelect, toSelect);

      expect(success).toBeTruthy();
    });
  });

  describe('Utils match', () => {
    it('should not return success result', () => {
      const reg = new RegExp(/test/);

      const { success } = match('FAKE_VALUE', reg);

      expect(success).toBeFalsy();
    });

    it('should return success', () => {
      const reg = new RegExp(/test/);

      const { success } = match('test', reg);

      expect(success).toBeTruthy();
    });
  });

  describe('Validator api', () => {
    let validator: Validator;
    beforeEach(() => {
      validator = new Validator();
    });

    it('should update own validations', () => {
      const input = document.createElement('input');
      const validation = () => required(input.value);
      validator.setValidation(input, validation);

      expect(validator.validations).toHaveLength(1);
      expect(validator.validations[0]).toEqual({ field: input, validation });
    });

    it('should call validation', () => {
      const input = document.createElement('input');
      const validation = jest.fn(() => required(input.value));

      validator.validate(input, validation);

      expect(validation).toHaveBeenCalled();
    });

    it('should not call validation', () => {
      const input = document.createElement('input');
      const validation = jest.fn(() => required(false));

      validator.validate(undefined, validation);
      validator.validate(input, undefined);

      expect(validation).not.toHaveBeenCalled();
    });

    it('should call validation on check', () => {
      const input = document.createElement('input');
      const validation = jest.fn(() => required(input.value));

      validator.setValidation(input, validation);
      validator.validateAll();

      expect(validation).toHaveBeenCalled();
    });
  });
});
