/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 8:01:21
 * @filename PassageCommentVo.ts
 * @description 前端传过来的文章评论信息
 *
 */
import {AddressInfo} from "@/model/po/info/AddressInfo";


export interface PassageCommentVo {


    id?: number; // 评论ID
    passageId?: number; // 评论的文章ID
    fromUid?: number; // 评论所属用户(发布者)ID
    toUid?: number; // 回复的用户ID
    parentUid?: number; // 父评论ID
    topicId?: number; // 所属主题ID
    content?: string; // 内容
    accessary?: string; // 附加的其他类型的媒体内容(JSON格式)
    tags?: string[]; // 标签
    category?: string[]; // 分类
    addressInfo?: AddressInfo; // 记录文章评论发布时的地址信息


}
