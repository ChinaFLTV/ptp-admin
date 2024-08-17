/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/14 PM 10:33:42
 * @filename room.ts
 * @description 聊天室功能相关的API接口
 *
 */

/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/14 PM 10:35:00
 * @filename room.ts
 * @description 群组中的群成员数据接口
 *
 */
export interface GroupMember {


    id: number, // 2024-8-14  22:38-用户ID
    nickname?: string; // 2024-8-14  22:35-用户昵称
    avatarUrl?: string; // 2024-8-14  22:35-头像URL
    isOnline?: boolean; // 2024-8-14  22:37-用户是否在线


}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/15 PM 10:35:13
 * @filename room.ts
 * @description 群组中的群聊消息数据接口
 *
 */
export interface GroupMessage {


    id: number; // 2024-8-15  22:35消息ID
    content?: string; //  2024-8-15  22:37-消息内容
    senderId: number; // 2024-8-15  22:37-发送者ID
    senderNickname: string; // 2024-8-16  21:09-发送者昵称
    senderAvatarUrl?: string; // 2024-8-15  22:37-发送者头像URL
    receiverId?: number; // 2024-8-15  22:38-接受者ID(-1则为全部聊天成员接收)
    dateTime: Date; // 2024-8-15  22:39-消息发送时间
    type: number; // 2024-8-15  22:39-消息类型


}
