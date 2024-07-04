/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 8:16:24
 * @filename useLocale.ts
 * @description 国际化相关的Hook工具库
 *
 */

import {LocaleType, useLocaleStore} from "@/store/modules/locale";
import {i18n} from "@/plugins/vueI18n";
import {setHtmlPageLanguage} from "@/plugins/vueI18n/helper";

const localeStore = useLocaleStore();

/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 8:16:39
 * @filename useLocale.ts
 * @param newLocaleId 新的区域语言配置ID
 * @description 更新区域语言配置
 *
 */
function setI18nLanguage(newLocaleId: LocaleType) {

    if (i18n.mode === "legacy")
        i18n.global.locale = newLocaleId;
    else
        (i18n.global.locale as any).value = newLocaleId;

    localeStore.updateCurrentLocale(newLocaleId);
    setHtmlPageLanguage(newLocaleId);

}

/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 8:20:05
 * @filename useLocale.ts
 * @description 生成一个易于操作区域语言的结构体
 *
 */
export function useLocale() {

    function changeLocale(newLocaleId: LocaleType) {

        // const languageModule = await import((`../../locales/${newLocaleId}.ts`));
        i18n.global.setLocaleMessage(newLocaleId, localeStore.getLocaleById(newLocaleId).ptp.default);

        setI18nLanguage(newLocaleId);

    }

    return {

        changeLocale

    };

}

