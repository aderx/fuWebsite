/**
 * 获取一个数据的类型，或者比较一个数据时候是指定类型
 * @param value 需要判断的数据
 */
export function getType(value: any): string {
  const stringTypeName = Object.prototype.toString.call(value);
  const typeName = stringTypeName.match(/\[object (.+)]/)?.[1] || "";
  return typeName.toLowerCase();
}

/**
 * 判断数据的类型
 * @param value 数据值
 * @param targetType 目标类型
 */
export function isTargetType(value: any, targetType: string): boolean {
  return getType(value) === String(targetType).toLowerCase();
}

/**
 * 空函数，避免多次重复定义无意义的空函数
 * @constructor
 */
// eslint-disable-next-line
export const NOOP = () => {};

/**
 * 防抖函数
 * @param func 需要运行的函数
 * @param duration 延时时间，默认1s
 * @returns 防抖函数
 */
export const debounce = (func: (...args: any[]) => void, duration = 1000) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, duration, ...args);
  };
};
