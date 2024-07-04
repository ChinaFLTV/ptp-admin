/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 6:20:33
 * @filename index.ts
 * @description
 *
 */
import {createI18n, I18nOptions} from "vue-i18n";
import {setHtmlPageLanguage} from "@/plugins/vueI18n/helper";
import {App} from "vue";
import {LocaleType, useLocaleStore} from "@/store/modules/locale";

const localeStore = useLocaleStore();

/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 6:34:08
 * @filename index.ts
 * @description 根据当前区域设置自动生成自定义的I18n选项配置
 * @return 自定义的I18n选项配置
 *
 */
function createI18nOptions(): I18nOptions {

    const locale: LocaleType = localeStore.currentLocaleId; // 2024-7-2  1827-TODO-后续将替换为从本地缓存中加载当前区域设置数据
    // const currentLocale = await import(`../../locales/${locale}.ts`);

    setHtmlPageLanguage(locale);

    return {

        legacy: false, // 让 setup 函数可以通过 t 访问
        locale, // 默认语言
        fallbackLocale: localeStore.defaultLocaleId, // 当未提供所需语言的翻译时 , 将回退到的语言
        messages: { // 当前的语言类型

            [locale]: localeStore.getLocaleById(localeStore.currentLocaleId).ptp ?? {}

        },
        availableLocales: localeStore.availableLocales.map(l => l.id),
        sync: true,
        // silentTranslationWarn: true,
        // missingWarn: false,
        // silentFallbackWarn: true,
        globalInjection: true // 让 template 可以像 vue2 那样使用 $t 来访问

    };

}

// 2024-7-3  17:59-在非setup函数中调用I18n动态加载区域语言时 , 请使用该唯一实例
export let i18n: ReturnType<typeof createI18n>;


/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 7:07:38
 * @filename index.ts
 * @param app VUE应用
 * @description 对APP启用并挂载I18n插件
 *
 */
export function setI18n(app: App<Element>) {

    const options: I18nOptions = createI18nOptions();
    i18n = createI18n(options);
    app.use(i18n);

}
