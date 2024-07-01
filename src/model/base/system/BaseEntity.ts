/**
 *
 * @author Lenovo
 * @date 2024/6/30 PM 11:26:16
 * @filename BaseEntity.ts
 * @description 消息流实体类的基类
 *
 */
import {TaskStatus} from "@/enums/TaskStatus";

export default interface BaseEntity {


    id?: number; // 流水ID
    uid?: number; // 动作发起者ID
    status?: TaskStatus; // 流水状态
    meta?: { [key: string]: any }; // 其他数据配置(JSON)
    createTime?: Date; // 动作产生时间
    updateTime?: Date; // (最后)修改时间
    isDeleted?: number; // 事件是否已被逻辑移除
    version?: number; // 当前实体的版本(用于辅助实现乐观锁)


}
