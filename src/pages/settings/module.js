"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __importDefault(require("../../common/Form/Form"));
const checkForm = (e) => {
    var _a;
    e.preventDefault();
    const formObject = new Form_1.default((_a = e.target) === null || _a === void 0 ? void 0 : _a.id);
    if (formObject && formObject.isValid()) {
        console.log('form valid');
        return;
    }
    console.log('form invalid');
};
exports.default = () => {
    const updateForm = document.querySelector('form#form-settings');
    const changePasswordForm = document.querySelector('form#form-change-password');
    if (updateForm) {
        updateForm.addEventListener('submit', checkForm);
    }
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', checkForm);
    }
};
