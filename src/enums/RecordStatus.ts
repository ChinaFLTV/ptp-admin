/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:23:33
 * @filename RecordStatus.ts
 * @description 交易订单的状态枚举类
 *
 */

export enum RecordStatus {


    NORMAL = 1301, // 正常
    PENDING = 1302, // 待定
    COMPLETE = 1303, // 完成
    CANCEL = 1304, // 取消
    ABORT = 1305, // 中止
    COMMIT = 1306, // 已提交
    ROLLBACK = 1307 // 回退


}
