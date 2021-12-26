import { PlainObject } from "@/types";
import { getType, isTargetType } from "./utils";

/**
 * 深拷贝一个对象
 * @param obj 对象
 */
function deepCopy<T extends PlainObject>(obj: T): T {
  const newObject = JSON.parse(JSON.stringify(obj));
  const notParseType = ["function", "undefined", "symbol"];

  deepMap(obj, (value, keyList) => {
    // 替换无法被直接转换的值
    if (notParseType.indexOf(getType(value))) {
      let flag: any = {};
      keyList.forEach((key, index) => {
        if (index === keyList.length - 1) {
          flag[key] = value;
        } else {
          flag = newObject[key];
        }
      });
    }
  });

  return newObject;
}

/**
 * 深递归遍历对象
 * @param baseObj 待遍历的对象
 * @param callback 每层遍历要执行的方法,支持返回true中止后序所有遍历
 */
function deepMap(
  baseObj: PlainObject,
  callback: (value: unknown, keyList: string[]) => boolean | void
) {
  let needBreak = false;
  (function mapObj(obj: PlainObject = baseObj, levelKey: string[] = []) {
    // 中断所有未开始的遍历
    if (needBreak) return;
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        needBreak = !!callback(obj[key], [...levelKey, key]);
        // 递归遍历子对象
        if (isTargetType(obj[key], "object")) {
          mapObj(obj[key], [...levelKey, key]);
        }
        // 中断当前对象的后续遍历
        if (needBreak) return;
      }
    }
  })();
}

/**
 * 深递归合并对象数据
 * @param baseObj 基础数据
 * @param expandObj 需要合并的数据，支持任意个对象的合并
 */
function deepMerge(baseObj: PlainObject, ...expandObj: PlainObject[]) {
  return deepCopy(Object.assign(baseObj, ...expandObj));
}

/**
 * 查找对象中指定位置的数据
 * @param baseObj 查找的对象
 * @param keys 路径数组
 */
function findByLine(baseObj: PlainObject, keyList: string[]) {
  let value: any = baseObj;

  while (keyList.length) {
    const key = keyList.shift() || "";

    // 当下一级不存在时，则表示传参不匹配，直接结束
    if (value[key]) {
      value = value[key];
    } else {
      value = undefined;
    }
  }

  return value;
}

/**
 * 获取对象中某个字段的值
 * @param obj 待获取值的对象
 * @param keys 需要获取的键名，支持用.连接的多级
 * @param defaultValue 找不到值时返回的默认值
 */
function getValue<T>(
  obj: PlainObject,
  keys: string,
  defaultValue?: T,
  flag = "."
) {
  return findByLine(obj, keys.split(flag)) || defaultValue;
}

/**
 * 设置对象中某个字段的值
 * @param obj 待获取值的对象
 * @param keys 需要获取的键名，支持用.连接的多级
 * @param value 待设置的值
 */
function setValue<T>(obj: PlainObject, keys: string, value: T, flag = ".") {
  const keyList = keys.split(flag);
  const lastKey = keyList.pop() || "";

  const lastLevelObj = findByLine(obj, keyList);

  if (lastLevelObj) {
    lastLevelObj[lastKey] = value;
  }
}

export { deepCopy, deepMap, getValue, setValue, deepMerge };
