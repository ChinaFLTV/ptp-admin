/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:40:23
 * @filename MessageEvent.ts
 * @description 一般事件流实体类
 *
 */
import BaseEntity from "@/model/base/system/BaseEntity";

export interface MessageEvent extends BaseEntity {


    title?: string; // 事件标题
    content?: string; // 事件说明
    remarks?: { [key: string]: string }; // 备注信息


}
