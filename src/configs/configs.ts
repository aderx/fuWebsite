import { PlainObject } from "@/types";
import { deepCopy, deepMerge } from "@/utils";

/**
 * @role 系统
 * @type 受保护
 * @level 1
 */
const SYS_PROTECT_CONFIGS: PlainObject = {};

/**
 * @role 管理员
 * @type 公有
 * @level 2
 */
const ADMIN_PUBLIC_CONFIGS: PlainObject = {
  // 强制忽略本地的语言配置
  IGNORE_LOCALE_LANGUAGE: false,
};

/**
 * @role 系统
 * @type 公有
 * @level 3
 */
const SYS_PUBLIC_CONFIGS: PlainObject = {};

/**
 * @role 用户
 * @type 公有
 * @level 4
 */
const USER_PUBLIC_CONFIGS: PlainObject = {};

export const configs = deepMerge(
  {},
  USER_PUBLIC_CONFIGS,
  SYS_PUBLIC_CONFIGS,
  ADMIN_PUBLIC_CONFIGS,
  SYS_PROTECT_CONFIGS
);
