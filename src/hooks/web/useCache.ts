/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 5:36:12
 * @filename useCache.ts
 * @description 与本地缓存数据操作相关的hook工具库
 *
 */

import WebStorageCache from "web-storage-cache";

type CacheType = "localStorage" | "sessionStorage";


// 2024-7-3  19:19-预定义的全局缓存键
export const CACHE_KEY = {

    TOKEN: "token",
    LOCALE: "locale"

};


/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 7:19:52
 * @filename useCache.ts
 * @return WebStorageCache
 * @param type 缓存类型(全局/会话级别)
 * @description 根据输入的缓存类型生成一个WebStorageCache
 *
 */
export function useCache(type: CacheType = "localStorage") {

    const wsCache: WebStorageCache = new WebStorageCache({

        storage: type

    });

    return {wsCache};

}


/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 8:29:24
 * @filename useCache.ts
 * @description 清除与用户相关的本地状态缓存数据
 *
 */
export function clearUserCache() {

    const {wsCache} = useCache("localStorage");

    // 2024-7-3  19:29-TODO-后续需要在这里清除用户key相关联的缓存资源
    wsCache.delete(CACHE_KEY.TOKEN);

}
