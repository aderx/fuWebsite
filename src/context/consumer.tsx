import { useContext } from "react";
import { PlainObject } from "@/types";
import { GlobalContext } from "./context";

/**
 * 获取context内的数据
 * @param key 获取的制定的值，默认获取所有数据
 * @param context 指定的context环境，默认是GlobalContext
 */
export const getContext = (key?: string, context = GlobalContext) => {
  const contextData: PlainObject = useContext(context) || {};
  return key ? contextData[key] : contextData;
};
