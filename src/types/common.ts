import { LANGUAGE_CN } from "consts/i18n/cn";

export interface TypeObject<T> {
  [key: string]: T;
}

export type PlainObject = Record<string, any>;

export type I18NType = typeof LANGUAGE_CN;
