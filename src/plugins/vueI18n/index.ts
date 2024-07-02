/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 6:20:33
 * @filename index.ts
 * @description
 *
 */
import {createI18n, I18n, I18nOptions} from "vue-i18n";
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
async function createI18nOptions(): Promise<I18nOptions> {

    const locale: LocaleType = localeStore.currentLocale.id; // 2024-7-2  1827-TODO-后续将替换为从本地缓存中加载当前区域设置数据
    const currentLocale = await import(`../../locales/${locale}.ts`);

    setHtmlPageLanguage(locale);

    return {

        legacy: false,
        locale,
        fallbackLocale: localeStore.defaultLocale.id,
        messages: {

            [locale]: currentLocale.default ?? {}

        },
        availableLocales: localeStore.availableLocales.map(l => l.id),
        sync: true,
        silentTranslationWarn: true,
        missingWarn: false,
        silentFallbackWarn: true

    };

}


/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 7:07:38
 * @filename index.ts
 * @param app VUE应用
 * @description 对APP启用并挂载I18n插件
 *
 */
export async function setI18n(app: App<Element>): Promise<void> {

    const options: I18nOptions = await createI18nOptions();
    const i18n: I18n = createI18n(options);
    app.use(i18n);

}
