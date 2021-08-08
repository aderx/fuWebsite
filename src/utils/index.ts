import { CommonObject } from "types/common";

/**
 * 深递归判断对象数据
 * @param {object} base 基础数据
 * @param {object} expand 需要处理的数据1
 */
export function mergeObject<T, P> (base: T, expand: P) {
    // 若不存在基本信息或者基本信息相同就直接返回基础数据
    // const baseObj = deepCopyObj(base);
    //
    // Object.keys(expand).forEach(key => {
    //     // 如果有需要忽略的信息
    //     if(ignoreKey) {
    //         if(Type(ignoreKey, 'string') && ignoreKey === key){
    //             return;
    //         }else if(ignoreKey.includes(key)){
    //             return;
    //         }
    //     }
    //
    //     const expandItem = expand[key];
    //     const baseItem = baseObj[key];
    //     // 判断当前字段是不是对象
    //     const isObjType = Type(expandItem, 'object');
    //
    //     // 若扩展字段类型是对象，判断若扩展对象的类型和原对象类型相同，就递归判断每一个对象
    //     // 其他所有情况都直接赋值扩展对象的值
    //     if(isObjType && Type(expandItem, typeof baseItem)){
    //         baseObj[key] = mergeObject(baseItem, expandItem);
    //     }else{
    //         baseObj[key] = expandItem;
    //     }
    // });

    return Object.assign(base, expand);
}

/**
 * 深拷贝一个对象
 * @param obj
 */
export function deepCopyObj(obj: CommonObject): CommonObject {
    const newObject = JSON.parse(JSON.stringify(obj));
    const notParseType = ['function', 'undefined', 'symbol'];

    mapObject(obj, (value, keyList) => {
        // 替换无法被直接转换的值
        if(notParseType.indexOf(getType(value))){
            let flag: any = {};
            keyList.forEach((key, index) => {
                if(index === keyList.length - 1){
                    flag[key] = value;
                }else{
                    flag = newObject[key];
                }
            })
        }
    })

    return newObject;
}

/**
 * 深递归遍历对象
 * @param obj 待遍历的对象
 * @param callback 每层遍历要执行的方法
 * @param levelKey 已经遍历过的key
 */
function mapObject (obj: CommonObject, callback: (value: any, keyList: string[]) => void, levelKey: string[] = []) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key)){
            callback(obj[key], [...levelKey, key]);
            // 递归遍历子对象
            if(isTargetType(obj[key], 'object')){
                mapObject(obj[key], callback, [...levelKey, key]);
            }
        }
    }
}

/**
 * 获取一个数据的类型，或者比较一个数据时候是指定类型
 * @param value 需要判断的数据
 */
export function getType(value: any): string {
    const stringTypeName = Object.prototype.toString.call(value);
    const typeName = stringTypeName.match(/\[object (.+)]/)?.[1] || '';
    return typeName.toLowerCase();
}

/**
 * 判断数据的类型
 * @param value 数据值
 * @param targetType 目标类型
 */
export function isTargetType (value: any, targetType: string): boolean {
    return getType(value) === String(targetType).toLowerCase();
}

/**
 * 空函数，避免多次重复定义无意义的空函数
 * @constructor
 */
// eslint-disable-next-line
export const NOOP = () => {};