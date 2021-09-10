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

    // Не проверяю длину просто потому, что люди пишут по-разному: с пробелами, с скобками.
    const regExp = new RegExp(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gi);

    return regExp.test(value);
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
    // try this ^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$
    const reg: RegExp = new RegExp(/^[A-Z0-9-_]{3,20}$/gim);
    const isNaN: boolean = Number.isNaN(Number(login));
    return reg.test(login) && isNaN;
  }

  static password(password: string): boolean {
    const reg: RegExp = new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/gm);
    return reg.test(password);
  }
}
