/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 6:55:39
 * @filename PassageComment.ts
 * @description 文章评论的实体类(PO)
 *
 */
import {AddressInfo} from "@/model/po/info/AddressInfo";


export interface PassageComment {


    id?: number; // ID
    passageId?: number; // 评论的文章ID
    fromUid?: number; // 评论所属用户(发布者)ID
    toUid?: number; // 回复的用户ID(如果是文章的一级评论，则此值为null)
    parentUid?: number; // 父评论ID
    topicId?: number; // 所属主题ID
    content?: string; // 内容
    tags?: string[]; // 标签
    category?: string[]; // 分类
    browseNum?: number; // 浏览量
    likeNum?: number; // 点赞量
    unlikeNum?: number; // 倒赞量
    commentNum?: number; // 评论量
    starNum?: number; // 收藏量
    addressInfo?: AddressInfo; // 记录文章评论发布时的地址信息


}
