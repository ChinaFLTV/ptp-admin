/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:03:07
 * @filename TransactionRecord.ts
 * @description 商品交易订单(PO实体类)
 *
 */
import {AddressInfo} from "@/model/po/info/AddressInfo";
import {RecordStatus} from "@/enums/RecordStatus";

export interface TransactionRecord {


    id?: number; // ID
    uid?: number; // 交易者ID
    commodityId?: number; // 商品ID
    remark?: string; // 交易备注
    count?: number; // 下单数量
    totalPrice?: number; // 总价
    discount?: number; // 折扣
    paymentMode?: string; // 支付方式
    tags?: string[]; // 标签
    category?: string[]; // 分类
    browseNum?: number; // 浏览量
    likeNum?: number; // 点赞量
    unlikeNum?: number; // 倒赞量
    commentNum?: number; // 评论量
    starNum?: number; // 收藏量
    processors?: number[]; // 中间处理该订单的人员ID
    addressInfo?: AddressInfo; // 发布时用户所在的地址信息
    status?: RecordStatus; // 实例状态
    meta?: { [key: string]: any }; // 其他数据配置(JSON)
    createTime?: Date; // 流水创建时间
    updateTime?: Date; // (最后)更新时间
    isDeleted?: number; // 当前实体是否已被逻辑删除
    version?: number; // 当前实体的版本(用于辅助实现乐观锁)


}
