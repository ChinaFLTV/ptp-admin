/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 8:04:41
 * @filename SubscribeVo.ts
 * @description 前端发送过来的用户订阅消息
 *
 */

export interface SubscribeVo {


    followerId?: number; // 订阅发起者ID
    subscriberId?: number; // 被订阅者ID
    coordinate?: string; // 订阅坐标


}
