/**
 *
 * @author Lenovo
 * @date 2024/7/5 PM 5:15:52
 * @filename measure.ts
 * @description 与测量相关的工具库
 *
 */


/**
 *
 * @author Lenovo
 * @date 2024/7/5 PM 5:16:16
 * @param text 需要测量的文字
 * @param fontSize 字体大小(默认为16px)
 * @param fontFamily 字体(默认为当前浏览器的默认字体)
 * @param letterSpacing 字体间距(默认为0px)
 * @return 被测量文字在当前字体设置下的长度
 * @filename measure.ts
 * @description 测量给定的一段文字的长度
 *
 */
export function measureText(text: string, fontSize: number = 16.0, fontFamily: string = window.getComputedStyle(document.body).fontFamily, letterSpacing: number = 0): number {

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const context: CanvasRenderingContext2D = canvas.getContext("2d");
    context.font = `${fontSize}px ${fontFamily}`;

    // 2024-7-5  17:48-由于 slanted/italic 这种斜体字体的存在 , 导致通过actualBoundingBoxLeft和actualBoundingBoxRight参数计算得到的宽度要往往比直接得到width的值大些
    // 因此为了保险起见 , 我们选择返回大一点的数值
    // 但有些字体并不如官方所说的那样width始终小于actualBoundingBoxLeft和actualBoundingBoxRight参数计算得到的宽度 , 反而却是width的值更大一些 , 因此我们取其二者的较大值即可
    // 原文链接 : https://juejin.cn/post/7091990279565082655
    // return context.measureText(text).width;
    const metrics: TextMetrics = context.measureText(text);
    const width: number = metrics.width;
    const actualWidth: number = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
    // 2024-7-5  18:43-考虑到其他开发人员可能会配置letter-spacing属性,因此有必要将letter-spacing值计算进去
    return Math.max(width, actualWidth) + (text.length - 1) * letterSpacing;

}


/**
 *
 * @author Lenovo
 * @param text 需要进行计算的文字
 * @param targetLength 需要缩放到的目标长度
 * @param fontFamily 字体(默认为当前浏览器的默认字体)
 * @param letterSpacing 字体间距(默认为0px)
 * @date 2024/7/5 PM 6:53:13
 * @filename measure.ts
 * @return 单个字体的大小
 * @description 计算指定长度字符串下的单个字体的大小
 *
 */
export function measureFontSize(text: string, targetLength: number, fontFamily: string = window.getComputedStyle(document.body).fontFamily, letterSpacing: number = 0): number {

    const textLength: number = targetLength - (text.length - 1) * letterSpacing;

    // 2024-7-5  19:15-由于比例字体中不同字符所占的宽度可能不同 , 按宽度比值计算 , 以正常字符m的宽度作为基准宽度1为例 , 那么最小字符宽度可为0.5 , 最大字符宽度可为1.43
    const pivotWidth: number = textLength / text.length;
    // 2024-7-5  19:18-因此我们只需要在[pivotWidth/1.43 , pivotWidth/0.5]的区间内进行动态计算即可
    // 同时为了加速计算 , 我们规定只计算字体的整数宽度 , 同时取上区间的子区间 , 这样做更保险可靠
    const minFontSize: number = Math.ceil(pivotWidth / 1.43);
    const maxFontSize: number = Math.floor(pivotWidth / 0.5);

    let prevFontSize: number = 16;
    /*for (let curFontSize: number = minFontSize; curFontSize <= maxFontSize; curFontSize++) {

        const curLength: number = measureText(text, curFontSize, fontFamily, letterSpacing);
        if (curLength > targetLength)
            break;
        else
            prevFontSize = curFontSize;

    }*/
    // 2024-7-5  20:00-采用二分法加速查找 , 将查找的时间复杂度由 o(N) 降为 o(logN)
    let leftFontSize: number = minFontSize;
    let rightFontSize: number = maxFontSize;

    while (leftFontSize < rightFontSize) {

        const pivotFontSize: number = (leftFontSize + rightFontSize) / 2;
        const curLength: number = measureText(text, pivotFontSize, fontFamily, letterSpacing);
        if (curLength < targetLength) {

            // 2024-7-5  20:09-仅在当前长度小于目标长度时进行更新 , 以向开发人员提供保守的字体大小
            prevFontSize = pivotFontSize;
            leftFontSize = pivotFontSize + 1;

        } else if (curLength == targetLength) {

            prevFontSize = pivotFontSize;
            break;

        } else {

            rightFontSize = pivotFontSize - 1;

        }

    }

    return prevFontSize;

}
