/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 11:30:28
 * @filename locale.ts
 * @description 区域设置相关的数据存储库(主要与语言国际化相关)
 *
 */
import el_zhCn from "element-plus/es/locale/lang/zh-cn";
import {defineStore} from "pinia";
import el_en from "element-plus/es/locale/lang/en";
import {pinia} from "@/store";
import ptp_zhCN from "@/locales/zh-CN";
import ptp_en from "@/locales/en";
import {CACHE_KEY, useCache} from "@/hooks/web/useCache";

export type LocaleType = "en" | "zh-CN"

export interface Locale {

    id: LocaleType, // 2024-7-2  23:48-区域ID
    name: String, // 2024-7-2  23:48-区域名称
    el: any, // 2024-7-2  23:48-区域所对应的Element Plus的区域配置
    ptp: any // 2024-7-3  17:42-区域所对应的PTP的区域配置

}

// 2024-7-2  23:41-存储区域ID、语言名称以及Element Plus的区域配置的数组
const availableLocales: Array<Locale> = [

    {
        id: "zh-CN",
        name: "简体中文",
        el: el_zhCn,
        ptp: ptp_zhCN

    },
    {

        id: "en",
        name: "English",
        el: el_en,
        ptp: ptp_en

    }

];


const {wsCache} = useCache();


const localeStore = defineStore("locale", {

    state: () => {

        return {

            availableLocales, // 2024-7-2  23:44-当前可用的语言设置
            defaultLocaleId: availableLocales[0].id, // 2024-7-2  23:44-当前的默认语言设置ID
            currentLocaleId: wsCache.get(CACHE_KEY.LOCALE) || "zh-CN"// 2024-7-2  23:44-当前正在使用的语言设置ID

        };

    },
    actions: {

        /**
         *
         * @author Lenovo
         * @date 2024/7/3 PM 10:06:51
         * @filename locale.ts
         * @param newLocaleId 新的区域配置ID
         * @description 更新区域配置
         *
         */
        updateCurrentLocale(newLocaleId: LocaleType) {

            const newLocale: Locale = this.getLocaleById(newLocaleId);
            wsCache.set(CACHE_KEY.LOCALE, newLocaleId);
            this.currentLocale = newLocale;

        },
        /**
         *
         * @author Lenovo
         * @date 2024/7/3 PM 9:20:39
         * @filename locale.ts
         * @param id 所要查找的区域ID
         * @description 根据区域ID获取对应区域的配置
         *
         */
        // 2024-7-3  22:18-Getters相当于幕后的计算属性 , 因此不能向Getter函数传递任何非state的参数 , 如果你确实希望能入自己的参数 , 则建议返回你所期望入参的函数
        getLocaleById(id: string): Locale {

            return this.availableLocales.find((l: Locale) => l.id == id);

        }

    },
    getters: {

        /**
         *
         * @author Lenovo
         * @date 2024/7/2 PM 11:45:12
         * @filename locale.ts
         * @description 获取当前可用的语言设置
         * @return 当前可用的语言设置
         *
         */
        getAvailableLocales(): Array<Locale> {

            return this.availableLocales;

        },
        /**
         *
         * @author Lenovo
         * @date 2024/7/2 PM 11:45:28
         * @filename locale.ts
         * @description 获取当前的默认语言设置
         * @return 当前的默认语言设置
         *
         */
        getDefaultLocale(): Locale {

            return this.defaultLocale;

        },
        /**
         *
         * @author Lenovo
         * @date 2024/7/2 PM 11:45:48
         * @filename locale.ts
         * @description 获取当前正在使用的语言设置
         * @return 当前正在使用的语言设置
         *
         */
        getCurrentLocale(): Locale {

            return this.currentLocale;

        }

    }

});


/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 11:51:37
 * @filename locale.ts
 * @description 提供一个与区域设置相关的存储中心
 * @return 与区域设置相关的存储中心
 *
 */
export function useLocaleStore() {

    return localeStore(pinia);

}
