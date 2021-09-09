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

  static validateName(name: string): boolean {
    const reg: RegExp = new RegExp(/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/);
    return reg.test(name);
  }

  static login(login: string): boolean {
    const reg: RegExp = new RegExp(/^[A-Z0-9-_]{3,20}$/gim);
    const isNaN: boolean = Number.isNaN(Number(login));
    return reg.test(login) && isNaN;
  }

  static password(password: string): boolean {
    const reg: RegExp = new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/gm);
    return reg.test(password);
  }
}
