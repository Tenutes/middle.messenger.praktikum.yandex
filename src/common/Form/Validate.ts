import { PHONE_CODES } from './constants';

export default class Validate {
  static phoneCodes(): string[] {
    return PHONE_CODES;
  }

  static phone(value: string | null): boolean {
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

  static email(value: string | null): boolean {
    if (!value) {
      return false;
    }

    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
      value
    );
  }
}
