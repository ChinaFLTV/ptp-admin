/**
 *
 * @author Lenovo
 * @date 2024/8/3 PM 10:33:15
 * @filename useCookie.ts
 * @description Cookie管理相关的Hook工具库
 *
 */

import Cookies from "js-cookie";

Cookies.set("name", "value", {expires: 7, path: ""});


/**
 *
 * @author Lenovo
 * @date 2024/8/3 PM 10:40:22
 * @filename useCookie.ts
 * @return 用于读写本地缓存数据的Cookie
 * @description 获取Cookie
 *
 */
export const useCookie = () => {

    return Cookies;

};
