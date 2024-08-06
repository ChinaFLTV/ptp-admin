/**
 * 文章评论相关API接口
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:45
 * @filename index.ts
 */

import { service } from "@/config/axios/service";
import { PTP_PASSAGE_COMMENT_BASE_URL } from "@/constants/web";
import { Result } from "@/model/po/response/Result";
import { PassageComment } from "@/model/po/content/PassageComment";
import { PassageCommentVo } from "@/model/vo/PassageCommentVo";

/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:45
 * @filename index.ts
 * @description 根据文章评论ID查询特定的文章评论详情
 * @param id 文章评论的唯一标识符
 * @returns 返回查询到的文章评论信息
 */
export const querySinglePassageComment = async (id: number): Promise<Result<PassageComment>> => {

    return await service.get(`${PTP_PASSAGE_COMMENT_BASE_URL}/query/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:45
 * @filename index.ts
 * @description 通过分页方式批量查询文章评论数据
 * @param offset 分页查询的起始偏移量
 * @param limit 分页查询的每页数据量限制
 * @returns 返回查询到的多篇文章评论信息
 */
export const queryPassageCommentPage = async (offset: number, limit: number): Promise<Result<PassageComment[]>> => {

    return await service.get(`${PTP_PASSAGE_COMMENT_BASE_URL}/query/page/${offset}/${limit}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:45
 * @filename index.ts
 * @description 在系统中添加新的文章评论记录
 * @param passageCommentVo 包含新文章评论信息的值对象
 * @returns 返回添加操作的结果
 */
export const insertSinglePassageComment = async (passageCommentVo: PassageCommentVo): Promise<Result<any>> => {

    return await service.post(`${PTP_PASSAGE_COMMENT_BASE_URL}/insert/single`, passageCommentVo);

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:45
 * @filename index.ts
 * @description 更新系统中的文章评论记录
 * @param passageCommentVo 包含更新信息的文章评论值对象
 * @returns 返回更新操作的结果
 */
export const updateSinglePassageComment = async (passageCommentVo: PassageCommentVo): Promise<Result<any>> => {

    return await service.put(`${PTP_PASSAGE_COMMENT_BASE_URL}/update/single`, { data: passageCommentVo });

};


/**
 * @author LiGuanda
 * @date 2024/8/6 PM 11:43:45
 * @filename index.ts
 * @description 根据ID删除系统中的文章评论记录
 * @param id 需要删除的文章评论的ID
 * @returns 返回删除操作的结果
 */
export const deleteSinglePassageComment = async (id: number): Promise<Result<any>> => {

    return await service.delete(`${PTP_PASSAGE_COMMENT_BASE_URL}/delete/single/${id}`);

};
