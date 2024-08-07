/**
 *
 * @author LiGuanda
 * @date 2024/8/1 PM 12:30:08
 * @filename index.ts
 * @description 公告相关的API
 *
 */

import {service} from "@/config/axios/service";
import {PTP_ANNOUNCEMENT_BASE_URL} from "@/constants/web";
import {Result} from "@/model/po/response/Result";
import {Announcement} from "@/model/po/content/Announcement";
import {AnnouncementVo} from "@/model/vo/AnnouncementVo";
import {ContentRankType} from "@/enums/ContentRankType";


/**
 *
 * @author LiGuanda
 * @date 2024/8/1 PM 1:32:58
 * @filename index.ts
 * @return 查询到的单条公告数据
 * @param id {number} 待查询的单条公告ID
 * @description 根据ID查询单条公告数据
 *
 */
export const querySingleAnnouncement = async (id: number): Promise<Result<Announcement>> => {

    return await service.get(PTP_ANNOUNCEMENT_BASE_URL + `/query/single/${id}`) as Result<Announcement>;

};


/**
 *
 * @author LiGuanda
 * @date 2024/8/1 PM 2:59:37
 * @param offset {number} 查询的一页公告数据的起始偏移量
 * @param limit {number} 查询的这一页公告数据的数量
 * @return 查询到的指定偏移量、指定长度的多条公告数据
 * @filename index.ts
 * @description 批量(分页)查询多条公告数据
 *
 */
export const queryAnnouncementPage = async (offset: number, limit: number): Promise<Result<Announcement[]>> => {

    return await service.get(PTP_ANNOUNCEMENT_BASE_URL + `/query/page/${offset}/${limit}`) as Result<Announcement[]>;

};


/**
 *
 * @author LiGuanda
 * @date 2024/8/1 PM 2:01:01
 * @filename index.ts
 * @return 是否成功添加公告
 * @param announcementVo {AnnouncementVo} 待添加的单条公告数据VO
 * @description 添加单条公告数据
 *
 */
export const insertSingleAnnouncement = async (announcementVo: AnnouncementVo): Promise<Result<any>> => {

    return await service.post(PTP_ANNOUNCEMENT_BASE_URL + "/insert/single", announcementVo) as Result<any>;

};


/**
 *
 * @author LiGuanda
 * @date 2024/8/1 PM 3:02:50
 * @filename index.ts
 * @return 是否成功修改指定的公告数据
 * @param announcementVo {AnnouncementVo} 待修改的单条公告数据VO
 * @description 修改单条公告数据
 *
 */
export const updateSingleAnnouncement = async (announcementVo: AnnouncementVo): Promise<Result<any>> => {

    return await service.put(PTP_ANNOUNCEMENT_BASE_URL + "/update/single", announcementVo) as Result<any>;

};


/**
 *
 * @author LiGuanda
 * @date 2024/8/1 PM 3:19:42
 * @filename index.ts
 * @return 是否成功删除指定的公告数据
 * @param id {number} 待删除的单条公告ID
 * @description 删除单条公告数据
 *
 */
export const deleteSingleAnnouncement = async (id: number): Promise<Result<any>> => {

    return await service.delete(PTP_ANNOUNCEMENT_BASE_URL + `/delete/single/${id}`) as Result<any>;

};


/**
 *
 * @author LiGuanda
 * @date 2024/8/1 PM 3:23:30
 * @filename index.ts
 * @return 查询到的指定类型的排行榜的公告数据
 * @param offset {number} 查询的一页排行榜公告数据的起始偏移量
 * @param limit {number} 查询的这一页排行榜公告数据的数量
 * @param rankType {ContentRankType} 排行榜的类型
 * @description 分页获取指定类型的排行榜的公告数据
 *
 */
export const queryAnnouncementRankPage = async (offset: number, limit: number, rankType: ContentRankType): Promise<Result<any>> => {

    return await service.get(PTP_ANNOUNCEMENT_BASE_URL + "/query/rank/page") as Result<any>;

};
