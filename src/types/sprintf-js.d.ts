/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/5 PM 9:22:07
 * @filename sprintf-js.d.ts
 * @description sprintf-js库对应的TS声明文件
 *
 */

declare module "sprintf-js" {


    export function sprintf(format: string, ...args: any[]): string;


    export function vsprintf(format: string, args?: any[]): string;


}
