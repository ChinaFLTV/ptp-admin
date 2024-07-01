/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:59:51
 * @filename LikeVo.ts
 * @description 前端传过来的用户点赞/取消点赞的信息
 *
 */
import {Action} from "@/enums/Action";
import {Scope} from "@/enums/Scope";

export interface LikeVo {


    uid?: number; // 动作发起者ID
    type?: Action; // 动作类型
    scope?: Scope; // 动作所在的作用域
    toId?: number; // 目标对象ID


}
