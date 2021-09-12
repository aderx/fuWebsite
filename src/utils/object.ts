import { CommonObject } from "@/types";
import { getType, isTargetType } from "./utils";

/**
* 深拷贝一个对象
* @param obj 对象
*/
function deepCopy <T extends CommonObject>(obj: T): T {
  const newObject = JSON.parse(JSON.stringify(obj));
  const notParseType = ['function', 'undefined', 'symbol'];

  deepMap(obj, (value, keyList) => {
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
* @param baseObj 待遍历的对象
* @param callback 每层遍历要执行的方法,支持返回true中止后序所有遍历
* @param levelKey 已经遍历过的key
*/
function deepMap <T extends CommonObject>(baseObj: T, callback: (value: unknown, keyList: string[]) => boolean | undefined | void) {
  let isBreak = false;
  (function mapObj(obj: CommonObject = baseObj, levelKey: string[] = []) {
    // 中断所有未开始的遍历
    if (isBreak) return;
    for(const key in obj) {
      if(Object.hasOwnProperty.call(obj, key)){
        isBreak = !!callback(obj[key], [...levelKey, key])
        // 递归遍历子对象
        if(isTargetType(obj[key], 'object')){
          mapObj(obj[key], [...levelKey, key]);
        }
        // 中断当前对象的后续遍历
        if (isBreak) return;
      }
  }
  })();
}

/**
 * 按照指定的路径查找值
 * @param baseObj 待遍历的对象
 * @param keys 指定的路径，用'.'间隔不同层级
 * @param callback 最后一级对象调用的方法
 */
function findByLine <T extends CommonObject>(baseObj: T, keys: string | string[], callback: (lastLevelObj: CommonObject, key: string) => void) {
  let keyList: string[] = [];
  if(typeof keys === 'object') {
    keyList = keys;
  } else {
    keyList = keys.split('.');
  }

  let obj = baseObj;
  while (keyList.length - 1 > 0) {
    const key = keyList.shift() || '';
    // 当下一级不存在时，则表示传参不匹配，直接结束
    if(obj[key]) {
      obj = obj[key];
    } else {
      return;
    }
  }

  // 遍历到最后一层对象，然后将操作移交出去
  callback(obj, keyList[0]);
}

/**
 * 获取对象中某个字段的值
 * @param obj 待获取值的对象
 * @param keys 需要获取的键名，支持用.连接的多级
 * @param defaultValue 找不到值时返回的默认值
 */
 function getValue <T>(obj: CommonObject, keys: string | string[], defaultValue?: T): T {
  let value = undefined;

  findByLine(obj, keys, (obj, key) => value = obj[key]);

  return value || defaultValue as unknown as T;
}

/**
 * 设置对象中某个字段的值
 * @param obj 待获取值的对象
 * @param keys 需要获取的键名，支持用.连接的多级
 * @param value 待设置的值
 */
function setValue <T>(obj: CommonObject, keys: string | string[], value: T) {
  findByLine(obj, keys, (obj, key) => {
    if (obj[key]) {
      obj[key] = value;
    }
  });
}

/**
 * 深递归判断对象数据
 * @param {object} base 基础数据
 * @param {object} expand 需要处理的数据1
 */
function deepMerge<T, P> (base: T, expand: P): T {

  deepMap<T>(base, (_value, keyList) => {
    const expandValue = getValue(expand, keyList);
    // 获取值出错，就不赋值这个字段
    if(!expandValue) return;
    setValue(base, keyList, expandValue);
  });

  return base;
}

export {
  deepCopy,
  deepMap,
  getValue,
  setValue,
  deepMerge,
}