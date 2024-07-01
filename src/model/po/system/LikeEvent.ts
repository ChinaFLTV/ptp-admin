/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:39:30
 * @filename LikeEvent.ts
 * @description 点赞/取消点赞相关的事件实体类
 *
 */
import BaseEntity from "@/model/base/system/BaseEntity";
import {Action} from "@/enums/Action";
import {Scope} from "@/enums/Scope";

export interface LikeEvent extends BaseEntity {


    type?: Action; // 动作类型
    scope?: Scope; // 动作所在的作用域
    toId?: number; // 目标对象ID


}
