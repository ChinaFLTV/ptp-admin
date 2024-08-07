/**
 * 对话相关API接口
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:00
 * @filename index.ts
 */

import {service} from "@/config/axios/service";
import {PTP_DIALOGUE_BASE_URL} from "@/constants/web";
import {Result} from "@/model/po/response/Result";
import {Dialogue} from "@/model/po/content/Dialogue";
import {DialogueVo} from "@/model/vo/DialogueVo";
import {ContentRankType} from "@/enums/ContentRankType";

/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:00
 * @filename index.ts
 * @description 根据对话ID查询特定的对话信息
 * @param id 对话的唯一标识符
 */
export const querySingleDialogue = async (id: number): Promise<Result<Dialogue>> => {

    return await service.get(`${PTP_DIALOGUE_BASE_URL}/query/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:00
 * @filename index.ts
 * @description 通过分页方式批量查询对话数据
 * @param offset 分页查询的起始偏移量
 * @param limit 分页查询的每页数据量限制
 */
export const queryDialoguePage = async (offset: number, limit: number): Promise<Result<Dialogue[]>> => {

    return await service.get(`${PTP_DIALOGUE_BASE_URL}/query/page/${offset}/${limit}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:00
 * @filename index.ts
 * @description 添加新的对话记录到系统中
 * @param dialogueVo 包含新对话信息的值对象
 */
export const insertSingleDialogue = async (dialogueVo: DialogueVo): Promise<Result<any>> => {

    return await service.post(`${PTP_DIALOGUE_BASE_URL}/insert/single`, dialogueVo);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:00
 * @filename index.ts
 * @description 更新系统中的对话记录
 * @param dialogueVo 包含更新信息的对话值对象
 */
export const updateSingleDialogue = async (dialogueVo: DialogueVo): Promise<Result<any>> => {

    return await service.put(`${PTP_DIALOGUE_BASE_URL}/update/single`, dialogueVo);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:00
 * @filename index.ts
 * @description 根据ID删除系统中的对话记录
 * @param id 需要删除的对话的ID
 */
export const deleteSingleDialogue = async (id: number): Promise<Result<any>> => {

    return await service.delete(`${PTP_DIALOGUE_BASE_URL}/delete/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:00
 * @filename index.ts
 * @description 分页获取对话排行榜数据
 * @param offset 分页查询的起始偏移量
 * @param limit 分页查询的每页数据量限制
 * @param rankType 对话排行榜的类型
 */
export const queryDialogueRankPage = async (offset: number, limit: number, rankType: ContentRankType): Promise<Result<any>> => {

    return await service.get(`${PTP_DIALOGUE_BASE_URL}/query/rank/page`, {params: {offset, limit, rankType}});

};
