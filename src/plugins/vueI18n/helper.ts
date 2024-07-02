/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 6:18:40
 * @filename helper.ts
 * @description 国际化相关的工具库
 *
 */
import {LocaleType} from "@/store/modules/locale";

export function setHtmlPageLanguage(locale: LocaleType) {

    document.querySelector("html").setAttribute("lang", locale);

}
