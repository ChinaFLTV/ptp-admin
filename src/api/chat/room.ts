/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/14 PM 10:33:42
 * @filename room.ts
 * @description 聊天室功能相关的API接口
 *
 */

import {PTP_USER_CHAT_BASE_URL} from "@/constants/web";
import {service} from "@/config/axios/service";
import {Result} from "@/model/po/response/Result";
import {ChatRoom} from "@/model/po/ws/ChatRoom";

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
    type: MessageType; // 2024-8-15  22:39-消息类型


}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/23 PM 7:38:41
 * @filename room.ts
 * @description 消息类型
 *
 */
export enum MessageType {


    GROUP_CHAT = 1701,
    PRIVATE_CHAT = 1702,
    SYSTEM = 1703,
    UNKNOWN = 1704


}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/23 PM 3:59:01
 * @filename room.ts
 * @param id {number} 房间号
 * @description 查询指定房间号的群聊房间信息
 *
 */
export const querySingleChatRoom = async (id: number): Promise<Result<ChatRoom>> => {

    return await service.get(`${PTP_USER_CHAT_BASE_URL}/query/population/${id}`);

};
