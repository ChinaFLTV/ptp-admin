/**
 *
 * @author Lenovo
 * @date 2024/7/4 PM 5:49:16
 * @param app 需要配置自定义指令的APP
 * @filename adjustFontSize
 * @description 对于设置文字只能在一行显示的块级元素 , 它将根据文字数量的多少来动态调整文字大小
 * 以保证文字始终能在元素中保持在一行正常显示
 *
 */
import {App} from "vue";
import {measureFontSize, measureText} from "@/utils/measure";

export function adjustFontSize(app: App<Element>) {


    // 2024-7-4  20:15-指令的值为文字所在行的最大长度(整型 , 默认单位为px)(必需 , 缺失则指令不起作用)
    app.directive("adjustFontSize", {


        updated(el, binding) {

            // 2024-7-4  20:12-获取当前元素的最终style(包括内联style、嵌入style、外部style)(只读)
            const elStyle: CSSStyleDeclaration = window.getComputedStyle(el);

            const maxLength: number = binding.value;
            const text: string = el.innerText;
            const fontSize: number = Number(elStyle.fontSize.substring(0, elStyle.fontSize.length - 2));
            const letterSpacing: number = Number(elStyle.letterSpacing.substring(0, elStyle.letterSpacing.length - 2));
            // 2024-7-4  20:51-获取设备密度
            // const deviceDensity: number = window.devicePixelRatio || 1;

            if (maxLength) {

                // 2024-7-5  15:34-不能简单地采用 textLength * fontSize 的方式进行计算 , 这样计算出的文字长度不准确 , 需要采用Canvas的measureText API进行测量
                //// 2024-7-4  20:36-px => sp的计算公式 : px = sp * 屏幕密度 / 160
                const textLength = measureText(text, fontSize, elStyle.fontFamily, letterSpacing);
                // const textLength = text.length * fontSize;
                if (textLength > maxLength) {

                    el.style.letterSpacing = "1px";
                    const newFontSize: number = measureFontSize(text, maxLength, elStyle.fontFamily, 1);
                    el.style.fontSize = newFontSize + "px";

                }

            }

        }


    });

}
