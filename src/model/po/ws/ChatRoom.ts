/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/24 AM 9:52:33
 * @filename ChatRoom.ts
 * @description 存储聊天房间信息的数据实体
 *
 */

export interface ChatRoom {


    id: number; // 2024-8-24  09:54-房间号
    name?: string; // 2024-8-24  09:54-房间名称
    avatarUrl?: string; // 2024-8-24  09:54-房间头像URL
    rank?: number; // 2024-8-24  09:54-房间等级
    onlineUsers?: Set<number>; // 2024-8-24  09:54-在线人数ID集合
    totalUsers?: Set<number>; // 2024-8-24  09:54-总共人数ID集合


}
