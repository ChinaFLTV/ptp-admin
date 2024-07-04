/**
 *
 * @author Lenovo
 * @date 2024/7/4 PM 5:46:24
 * @filename index.ts
 * @description 设置Vue的自定义指令
 *
 */
import {App} from "vue";
import {adjustFontSize} from "@/directives/view/adjustFontSize";

export function setupCustomDirectives(app: App<Element>) {

    adjustFontSize(app);

}
