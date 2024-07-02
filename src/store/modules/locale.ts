/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 11:30:28
 * @filename locale.ts
 * @description 区域设置相关的数据存储库(主要与语言国际化相关)
 *
 */
import zhCn from "element-plus/es/locale/lang/zh-cn";
import {defineStore} from "pinia";
import en from 'element-plus/es/locale/lang/en'
import {pinia} from "@/store";

export type LocaleType = "en" | "zh-CN"

export interface Locale {

    id: LocaleType, // 2024-7-2  23:48-区域ID
    name: String, // 2024-7-2  23:48-区域名称
    el: any // 2024-7-2  23:48-区域所对应的Element Plus的区域配置

}

// 2024-7-2  23:41-存储区域ID、语言名称以及Element Plus的区域配置的数组
const availableLocales: Array<Locale> = [

    {
        id: "zh-CN",
        name: "简体中文",
        el: zhCn

    },
    {

        id: "en",
        name: "English",
        el: en

    }

];


const localeStore = defineStore("locale", {

    state: () => {

        return {

            availableLocales, // 2024-7-2  23:44-当前可用的语言设置
            defaultLocale: availableLocales[0], // 2024-7-2  23:44-当前的默认语言设置
            currentLocale: availableLocales[0] // 2024-7-2  23:44-当前正在使用的语言设置


        };

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

    },
    actions: {

        updateCurrentLocale(newLocale: Locale) {

            this.currentLocale = newLocale;

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
