/**
 *
 * @author Lenovo
 * @date 2024/6/30 PM 11:15:13
 * @filename BaseEntity.ts
 * @description 言论、公告、文章、评论等实体类的基类，以提升代码复用性
 *
 */
import {AddressInfo} from "@/model/po/info/AddressInfo";
import {ContentStatus} from "@/enums/ContentStatus";

export default interface BaseEntity {


    id?: number; // ID
    uid?: number; // 发布者ID
    title?: string; // 标题
    content?: string; // 内容
    accessary?: string; // 附加的其他类型的媒体内容(JSON格式)
    tags?: Array<string>; // 标签
    category?: Array<string>; // 分类
    browseNum?: number; // 浏览量
    likeNum?: number; // 点赞量
    unlikeNum?: number; // 倒赞量
    commentNum?: number; // 评论量
    starNum?: number; // 收藏量
    addressInfo?: AddressInfo; // 发布时用户所在的地址信息
    status?: ContentStatus; // 实例状态
    meta?: { [key: string]: any }; // 其他数据配置(JSON)
    createTime?: Date; // 内容创建时间
    updateTime?: Date; // (最后)更新时间
    isDeleted?: number; // 当前实体是否已被逻辑删除
    version?: number; // 当前实体的版本(用于辅助实现乐观锁)


}
