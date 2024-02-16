/**
 *
 * @author Lenovo
 * @date 2024/2/14 下午 9:18:11
 * @filename uuid.ts
 * @description 用于返回一个随机的指定位数的UUID
 *
 */
export default function randomUUID(length: number = 13): number {

    return Math.round(Math.random() * Math.pow(10, length)) + (Math.round(new Date().getTime() / Math.pow(10, 13 - length)));

}
