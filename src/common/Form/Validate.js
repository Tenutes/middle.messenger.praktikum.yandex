"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Validate {
    static phoneCodes() {
        return constants_1.PHONE_CODES;
    }
    static phone(value) {
        if (!value) {
            return false;
        }
        if (/_/gi.test(value)) {
            return false;
        }
        const match = value.match(/\(\d{3}\)/gi);
        if (match) {
            const code = match[0].substr(1, 3);
            return this.phoneCodes().indexOf(code) !== -1;
        }
        return false;
    }
    static email(value) {
        if (!value) {
            return false;
        }
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(value);
    }
}
exports.default = Validate;
