import {SnowflakeIdv1} from "simple-flakeid";

/**
 *
 * @author Lenovo
 * @date 2024/2/14 下午 9:18:11
 * @filename id.ts
 * @description 用于返回一个随机的指定位数的UUID
 *
 */
export const randomUUID = (length: number = 13): number => {

    return Math.round(Math.random() * Math.pow(10, length)) + (Math.round(new Date().getTime() / Math.pow(10, 13 - length)));

};


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/11 PM 8:46:03
 * @filename id.ts
 * @description 专门用来生成雪花ID的实例
 *
 */
export const snowFlake: SnowflakeIdv1 = new SnowflakeIdv1({

    workerId: 1

});


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/11 PM 8:40:04
 * @filename id.ts
 * @return {number} 生成的唯一的雪花ID
 * @description 返回一个雪花算法生成的唯一ID
 *
 */
export function randomSnowID(): number {

    return snowFlake.NextNumber();

}
