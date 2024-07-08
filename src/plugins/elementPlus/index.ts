/**
 *
 * @author Lenovo
 * @date 2024/7/8 AM 10:20:18
 * @filename index.ts
 * @description 配置Element Plus UI框架
 *
 */
import {App} from "vue";
import ElementPlus from "element-plus";
import {Locale, useLocaleStore} from "@/store/modules/locale";


const localeStore = useLocaleStore();
const currentLocale: Locale = localeStore.getLocaleById(localeStore.currentLocaleId);


/**
 *
 * @author Lenovo
 * @date 2024/7/8 AM 10:24:19
 * @filename index.ts
 * @param app Vue应用实例
 * @description 配置Element Plus UI框架
 *
 */
export function setupElementPlus(app: App<Element>) {

    app.use(ElementPlus, {

        // 2024-2-18  15:29-调整ElementPlus语言为中文
        locale: currentLocale.el

    });

}
