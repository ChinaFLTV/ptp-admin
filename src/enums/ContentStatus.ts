/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:19:25
 * @filename ContentStatus.ts
 * @description 内容状态状态枚举信息
 *
 */

export enum ContentStatus {


    NORMAL = 100, // 正常
    ABNORMAL = 101, // 异常
    ERROR = 102, // 错误
    REJECT = 103, // 打回
    LIMIT = 104, // 限流
    BLOCK = 105, // 锁定
    HIDDEN = 106, // 隐藏
    DELETED = 107, // 删除
    FORBIDDEN = 107 // 封禁 (注：此处code值与BLOCK相同，可能是错误)


}
