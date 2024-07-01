/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:40:58
 * @filename SubscribeEvent.ts
 * @description 用户之间的订阅实体类(POJO)
 *
 */
import BaseEntity from "@/model/base/system/BaseEntity";
import {Action} from "@/enums/Action";

export interface SubscribeEvent extends BaseEntity {


    type?: Action; // 动作类型
    toUid?: number; // 被订阅/取关者ID
    coordinate?: string; // 订阅坐标


}
