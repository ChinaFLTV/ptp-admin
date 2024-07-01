/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:27:15
 * @filename TaskStatus.ts
 * @description 流水/任务状态枚举信息
 *
 */

export enum TaskStatus {


    NORMAL = 200, // 正常
    SUSPEND = 201, // 挂起
    POSTPONE = 202, // 推迟
    TERMINATION = 203, // 终止
    HIDDEN = 205, // 隐藏
    ROLLBACK = 206, // 回滚
    UNDO = 207 // 撤销


}
