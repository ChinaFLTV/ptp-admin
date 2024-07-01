/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:58:05
 * @filename ContentSearchVo.ts
 * @description 前端传递过来的根据关键词查询内容数据的ViewObject
 *
 */
import {ContentSearchType} from "@/enums/ContentSearchType";

export interface ContentSearchVo {


    contentSearchType?: ContentSearchType; // 搜索类型
    keywords?: string[]; // 查询的关键词
    offset?: number; // 期望查询到的结果集开始的偏移量
    count?: number; // 期望查询的内容实体的数量
    userId?: number; // 查询的用户的ID
    createTime?: Date; // 查询产生的时间


}
