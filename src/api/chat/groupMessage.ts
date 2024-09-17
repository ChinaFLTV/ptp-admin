/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/11 PM 10:22:53
 * @filename groupMessage.ts
 * @description 群聊消息相关的API接口
 *
 */

import {Result} from "@/model/po/response/Result";
import {GroupMessage} from "@/api/chat/room";
import {service} from "@/config/axios/service";
import {PTP_USER_CHAT_BASE_URL} from "@/constants/web";

/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/11 PM 10:23:12
 * @filename groupMessage.ts
 * @description 分页获取聊天室的聊天消息
 *
 */
export const queryGroupMessagePage = async (chatRoomId: number, pageNumber: number, count: number): Promise<Result<GroupMessage[]>> => {

    return await service.get(`${PTP_USER_CHAT_BASE_URL}/query/groupMessage/page`, {

        params: {

            chatRoomId,
            pageNumber,
            count

        }

    });

};
