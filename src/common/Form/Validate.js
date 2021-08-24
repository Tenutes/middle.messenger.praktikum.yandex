import { PHONE_CODES } from './constants';

export default class Validate {
  static phoneCodes() {
    return PHONE_CODES;
  }

  static phone(value) {
    if (!value) {
      return false;
    }

    if (/_/gi.test(value)) {
      return false;
    }

    const code = value.match(/\(\d{3}\)/gi)[0].substr(1, 3);

    return this.phoneCodes().indexOf(code) !== -1;

  }

  static email(value) {
    if (!value) {
      return false;
    }

    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
      value);
  }
}

