import { deepMerge } from "./object";
import LANGUAGE from "consts/i18n";

/**
 * 获取本地语言数据
 * @param code 需要获取的语言code，默认CN
 */
export function getLocale(code: Uppercase<string>) {
    const languageFLag = String(code).toUpperCase();
    // 进行数据合并，避免多余字段导致系统崩溃
    return deepMerge(LANGUAGE['DEFAULT'], LANGUAGE[languageFLag] || LANGUAGE['DEFAULT']);
}