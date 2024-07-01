/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:30:41
 * @filename PtpException.ts
 * @description 作为应用内统一封装的异常
 *
 */

export interface PtpException {


    code?: number; // 错误码为8xx
    message?: string;
    subMessage?: string; // 二级消息(一般面向开发人员，不对用户公布该消息)
    additionalData?: any; // 额外数据


}
