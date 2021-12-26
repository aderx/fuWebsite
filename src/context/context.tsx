import { createContext } from "react";

const defaultGlobalState = {};

/**
 * 全局context数据
 */
export const GlobalContext = createContext(defaultGlobalState);
