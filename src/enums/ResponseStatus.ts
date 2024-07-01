/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:24:27
 * @filename ResponseStatus.ts
 * @description 响应信息的状态枚举信息
 *
 */

export enum ResponseStatus {


    SUCCESS = 601, // 响应成功
    NEUTRAL = 602, // 响应完成
    FAILURE = 603, // 响应失败
    ABNORMAL = 604, // 响应被终止
    INTERRUPTED = 605, // 响应被拦截
    BLOCKED = 606 // 响应被阻止


}
