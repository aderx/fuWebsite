/**
 * 获取本地强存储数据
 * @param key 待获取内容的名称
 * @returns 获取到的值
 */
export function getStorage(key: string) {
  return localStorage.getItem(key);
}

/**
 * 保存本地强存储数据
 * @param key 待保存内容的名称
 * @param value 待保存内容的值
 */
export function setStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}

/**
 * 获取本地弱存储数据
 * @param key 待获取内容名称
 * @returns 获取到的值
 */
export function getWeakStorage(key: string) {
  return sessionStorage.getItem(key);
}

/**
 * 保存本地弱存储数据
 * @param key 待保存内容名称
 * @param value 待保存内容
 */
export function setWeakStorage(key: string, value: string) {
  return sessionStorage.setItem(key, value);
}

/**
 * 有选择的获取本地强缓存数据
 * @param key 待获取的内容名称
 * @param useStorage 是否使用缓存数据
 * @returns 获取到的数据，获取不到返回null
 */
export function getControlStorage(key: string, useStorage = true) {
  return useStorage ? getStorage(key) : null;
}

const tempFlag = "TEMP_STORAGE";

/**
 * 设置一个临时缓存
 * @param key 缓存标记
 * @param value 缓存的数据
 * @param duration 缓存有效时间，默认5分钟
 * @returns 临时缓存名称
 */
export function setTempStorage(
  keyFlag: string,
  value: string,
  duration = 300000
) {
  const tempKey = `${tempFlag}_${keyFlag}_${new Date().getTime()}_${
    Math.random() * 1000
  }`;

  sessionStorage.setItem(tempKey, value);

  setTimeout(sessionStorage.removeItem.bind(undefined, tempKey), duration);

  return tempKey;
}

/**
 * 获取一个临时缓存数据
 * @param key 缓存名称
 * @returns 获取到的数据
 */
export const getTempStorage = getWeakStorage;
