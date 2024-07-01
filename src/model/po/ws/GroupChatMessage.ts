/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:45:01
 * @filename GroupChatMessage.ts
 * @description WebSocket中的群聊消息
 *
 */

export interface GroupChatMessage {


    isSystem?: boolean; // 是否是系统消息
    fromUserId?: number; // 消息发送方用户ID
    toUserId?: number; // 消息接收方用户ID
    msg?: string; // 真正的消息内容
    dateTime?: Date; // 消息产生时间


}
