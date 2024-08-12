/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:30:41
 * @filename PtpException.ts
 * @description 作为应用内统一封装的异常
 *
 */

export class PtpException extends Error {


    code: number; // 错误码为8xx
    message: string; // 2024-8-11  15:13-异常信息
    subMessage: string; // 二级消息(一般面向开发人员，不对用户公布该消息)
    additionalData: any; // 额外数据


    constructor(code: number, message: string, subMessage: string = "") {

        super();
        this.code = code;
        this.message = message;
        this.subMessage = subMessage;

    }


}
