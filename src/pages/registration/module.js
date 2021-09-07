"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __importDefault(require("../../common/Form/Form"));
exports.default = () => {
    const form = document.querySelector('form#form-register');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const formObject = new Form_1.default(form.id);
            if (formObject.isValid()) {
                console.log('form valid');
                return;
            }
            console.log('form invalid');
        });
    }
};
