import { LANGUAGE_CN } from "../consts/languages/cn";
import { LANGUAGE_EN } from "../consts/languages/en";

/**
 * 获取本地语言数据
 * @param code 需要获取的语言code，默认CN
 */
export function getLocale(code) {
    // 做一次数据合并，避免部分字段没有对应释义
    return mergeObj(LANGUAGE_CN, String(code).toUpperCase() === 'EN' ? LANGUAGE_EN : LANGUAGE_CN);
}

// 相对应的语言
const OPPOSITE_LIST = {
    'CN': 'EN',
    'EN': 'CN',
};

/**
 * 获取与传入的地区数据相反的地区数据
 * @param code 需要获取的语言code，默认CN
 * @returns {*}
 */
export function getOpsLocale(code) {
    const upperCode = String(code).toUpperCase();
    return getLocale(OPPOSITE_LIST[upperCode]);
}

/**
 * 深递归判断对象数据
 * @param {object} base 基础数据
 * @param {object} expand 需要处理的数据
 * @param {string|string[]} ignoreKey 需要排除判断的key
 * @returns {*}
 */
function mergeObj (base, expand, ignoreKey = '') {
    // 若不存在基本信息或者基本信息相同就直接返回基础数据
    const baseObj = deepCopyObj(base);

    Object.keys(expand).forEach(key => {
        // 如果有需要忽略的信息
        if(ignoreKey) {
            if(Type(ignoreKey, 'string') && ignoreKey === key){
                return;
            }else if(ignoreKey.includes(key)){
                return;
            }
        }

        const expandItem = expand[key];
        const baseItem = baseObj[key];
        // 判断当前字段是不是对象
        const isObjType = Type(expandItem, 'object');

        // 若扩展字段类型是对象，判断若扩展对象的类型和原对象类型相同，就递归判断每一个对象
        // 其他所有情况都直接赋值扩展对象的值
        if(isObjType && Type(expandItem, typeof baseItem)){
            baseObj[key] = mergeObj(baseItem, expandItem);
        }else{
            baseObj[key] = expandItem;
        }
    });

    return baseObj;
}

/**
 * 深拷贝一个对象
 * @param obj
 * @returns {any}
 */
export function deepCopyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 获取一个数据的类型，或者比较一个数据时候是指定类型
 * @param value 需要判断的数据
 * @param compareType 需要比较的类型名
 * @returns {boolean|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
export function Type(value, compareType) {
    const type = typeof value;
    if(!compareType) {
        return type;
    }

    return type === String(compareType).toLowerCase();
}