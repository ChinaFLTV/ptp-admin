/**
 *
 * @author LiGuanda
 * @date 2024/2/11 下午 6:29:34
 * @filename desensitization.ts
 * @description 用于对用户的一些属性信息进行脱敏
 *
 */

/**
 *
 * @author LiGuanda
 * @param {string} originStr 原含有敏感信息的字符串
 * @param {string} concealChar 遮盖样式，默认为*
 * @param {number} exposeAmount 保留在外的字符数量
 * @return {string} 经脱敏处理后的字符串
 * @date 2024/2/11 下午 7:15:42
 * @filename desensitization.ts
 * @description 用于对用户的姓名类型的信息进行脱敏处理
 *
 */
function desensitize(originStr: string, concealChar: string = "*", exposeAmount: number = 1): string {

    if (originStr === undefined) {

        return originStr;

    }

    if (originStr.length > 0) {

        let processedName: string;

        // 2024-2-11  22:04-防止用户输入的暴露量数值非法
        if (exposeAmount < 0) {

            exposeAmount = 0;

        } else if (exposeAmount <= originStr.length) {

            processedName = originStr.substring(0, exposeAmount);

        } else {

            return originStr;

        }

        for (let i = exposeAmount; i < originStr.length; i++) {

            processedName += concealChar;

        }
        return processedName;

    } else {

        return null;

    }

}


export {

    desensitize

};
