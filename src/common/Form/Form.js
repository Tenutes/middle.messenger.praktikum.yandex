"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Registry_1 = __importDefault(require("../Registry/Registry"));
const Validate_1 = __importDefault(require("./Validate"));
class Form {
    constructor(id) {
        this.id = id;
        const form = document.getElementById(id);
        if (!form) {
            throw new Error('There is no Form with id:' + id);
        }
        this.form = form;
        this.values = {};
        this.errors = {};
        return this;
    }
    static get(id) {
        let instance = Registry_1.default.get('Form', id);
        if (instance) {
            return instance;
        }
        instance = new Form(id);
        Registry_1.default.set('Form', id, instance);
        return instance;
    }
    getValues() {
        this.values = {};
        if (this.form) {
            const inputs = Array.from(this.form.querySelectorAll('[name]'));
            inputs.forEach((input) => {
                this.values[input.name] = input.value;
            });
        }
        return this.values;
    }
    getFormData() {
        if (!this.form) {
            return null;
        }
        return new FormData(this.form);
    }
    isValid() {
        this.errors = {};
        this.values = this.getValues();
        const phone = this.form.querySelector('[name="phone"]');
        const email = this.form.querySelector('[name="email"]');
        const required = this.form.querySelectorAll('[required]');
        if (phone) {
            const value = this.values.phone;
            if (value.length && !Validate_1.default.phone(value)) {
                const message = 'Укажите корректный телефон';
                this.errors.phone = message;
                this.showError('phone', message);
            }
            else {
                this.hideError('phone');
            }
        }
        if (email) {
            const value = this.values.email;
            if (value.length && !Validate_1.default.email(value)) {
                const message = 'Укажите корректный Email';
                this.errors.email = message;
                this.showError('email', message);
            }
            else {
                this.hideError('email');
            }
        }
        for (let i = 0; i < required.length; i++) {
            const element = required[i];
            if (element.value === '') {
                const message = 'Поле обязательно для заполнения';
                element.classList.add('error');
                this.errors[element.name] = message;
                this.showError(element.name, message);
            }
            else {
                if (!this.errors[element.name]) {
                    this.hideError(element.name);
                }
            }
        }
        return Object.keys(this.errors).length === 0;
    }
    clear() {
        const added = (Array.from(this.form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), select, textarea')));
        added.forEach(element => (element.value = ''));
    }
    hideErrors() {
        for (const name in this.values) {
            if (this.values.hasOwnProperty(name)) {
                this.hideError(name);
            }
        }
    }
    hideError(name) {
        const element = this.form.querySelector(`[name="${name}"]`);
        if (element) {
            element.classList.remove('error', '!text-red');
            const label = this.form.querySelector(`label[for="${name}"].error`);
            label && label.remove();
        }
    }
    showError(name, message) {
        const element = this.form.querySelector(`[name="${name}"]`);
        if (element) {
            element.classList.add('!text-red', 'error');
            if (element.parentElement) {
                const errorLabel = element.parentElement.querySelector(`label[for="${name}"].error`);
                if (errorLabel) {
                    errorLabel.innerText = message;
                }
                else {
                    const errorChild = this.generateErrorLabel(name, message);
                    element.parentElement.appendChild(errorChild);
                }
            }
        }
    }
    generateErrorLabel(name, message) {
        const label = document.createElement('label');
        const labelClasses = [
            'error',
            'absolute',
            'text-[9px]',
            'top-[calc(100%+2px)]',
            'left-0',
            'text-red',
            'leading-none',
        ];
        label.setAttribute('for', name);
        label.setAttribute('generated', 'true');
        label.classList.add(...labelClasses);
        label.innerText = message;
        return label;
    }
}
exports.default = Form;
