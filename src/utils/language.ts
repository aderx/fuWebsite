import { deepMerge } from "./object";
import { LANGUAGE_CN, LANGUAGE_EN } from "@/consts";
import { getControlStorage } from "./storage";

const MapLanguage = {
  DEFAULT: LANGUAGE_CN,
  CN: LANGUAGE_CN,
  EN: LANGUAGE_EN,
};

/**
 * 获取指定的语言数据
 * @param code 需要获取的语言code，默认CN
 */
export function getLocale(useLocale = true, code?: Uppercase<string>) {
  const flag = getControlStorage("default_locale_type", useLocale) || code;
  const languageFLag = String(flag).toUpperCase();

  return deepMerge(MapLanguage.DEFAULT, MapLanguage[languageFLag]);
}
