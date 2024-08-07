/**
 * 文章相关API接口
 * @author LiGuanda
 * @date 2024/8/3 PM 3:00:00
 * @filename index.ts
 */

import {service} from "@/config/axios/service";
import {PTP_PASSAGE_BASE_URL} from "@/constants/web";
import {Result} from "@/model/po/response/Result";
import {Passage} from "@/model/po/content/Passage";
import {PassageVo} from "@/model/vo/PassageVo";
import {ContentRankType} from "@/enums/ContentRankType";

/**
 * @author LiGuanda
 * @date 2024/8/3 PM 3:05:00
 * @filename index.ts
 * @description 根据文章ID查询特定的文章详情
 * @param id 文章的唯一标识符
 * @returns 返回查询到的文章信息
 */
export const querySinglePassage = async (id: number): Promise<Result<Passage>> => {

    return await service.get(`${PTP_PASSAGE_BASE_URL}/query/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/3 PM 3:10:00
 * @filename index.ts
 * @description 通过分页方式批量查询文章数据
 * @param offset 分页查询的起始偏移量
 * @param limit 分页查询的每页数据量限制
 * @returns 返回查询到的多篇文章信息
 */
export const queryPassagePage = async (offset: number, limit: number): Promise<Result<Passage[]>> => {

    return await service.get(`${PTP_PASSAGE_BASE_URL}/query/page/${offset}/${limit}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/3 PM 3:15:00
 * @filename index.ts
 * @description 在系统中添加新的文章记录
 * @param passageVo 包含新文章信息的值对象
 * @returns 返回添加操作的结果
 */
export const insertSinglePassage = async (passageVo: PassageVo): Promise<Result<any>> => {

    return await service.post(`${PTP_PASSAGE_BASE_URL}/insert/single`, passageVo);

};


/**
 * @author LiGuanda
 * @date 2024/8/3 PM 3:20:00
 * @filename index.ts
 * @description 更新系统中的文章记录
 * @param passageVo 包含更新信息的文章值对象
 * @returns 返回更新操作的结果
 */
export const updateSinglePassage = async (passageVo: PassageVo): Promise<Result<any>> => {

    return await service.put(`${PTP_PASSAGE_BASE_URL}/update/single`, passageVo);

};


/**
 * @author LiGuanda
 * @date 2024/8/3 PM 3:25:00
 * @filename index.ts
 * @description 根据ID删除系统中的文章记录
 * @param id 需要删除的文章的ID
 * @returns 返回删除操作的结果
 */
export const deleteSinglePassage = async (id: number): Promise<Result<any>> => {

    return await service.delete(`${PTP_PASSAGE_BASE_URL}/delete/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/3 PM 3:30:00
 * @filename index.ts
 * @description 分页获取文章排行榜数据
 * @param offset 分页查询的起始偏移量
 * @param limit 分页查询的每页数据量限制
 * @param rankType 文章排行榜的类型
 * @returns 返回排行榜查询的分页数据
 */
export const queryPassageRankPage = async (offset: number, limit: number, rankType: ContentRankType): Promise<Result<any>> => {

    return await service.get(`${PTP_PASSAGE_BASE_URL}/query/rank/page`, {params: {offset, limit, rankType}});

};
