/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:01:54
 * @filename Commodity.ts
 * @description 交易商品的PO
 *
 */
import {CommodityStatus} from "@/enums/CommodityStatus";
import {AddressInfo} from "@/model/po/info/AddressInfo";

export interface Commodity {


    id?: number; // 商品唯一标识符
    userId?: number; // 商品卖家ID
    name?: string; // 商品名称
    description?: string; // 商品详细描述
    tags?: string[]; // 标签
    category?: string[]; // 分类
    browseNum?: number; // 浏览量
    likeNum?: number; // 点赞量
    unlikeNum?: number; // 倒赞量
    commentNum?: number; // 评论量
    starNum?: number; // 收藏量
    price?: number; // 商品售价
    stockQuantity?: number; // 商品库存数量
    brand?: string; // 商品品牌
    weight?: number; // 商品重量
    size?: string; // 商品尺寸
    color?: string; // 商品颜色
    material?: string; // 商品材质
    origin?: string; // 商品产地
    imageUrl?: string; // 商品图片URL
    status?: CommodityStatus; // 商品条形码
    barcode?: string; // 商品状态
    meta?: { [key: string]: any }; // 其他数据配置(JSON)
    addressInfo?: AddressInfo; // 发布时用户所在的地址信息
    createTime?: Date; // 商品发布时间
    updateTime?: Date; // 商品信息(最后)更新时间
    isDeleted?: number; // 当前实体是否已被逻辑删除
    version1?: number; // 当前实体的版本(用于辅助实现乐观锁)(商品的版本号)
    version2?: number; // 当前实体的版本(用于辅助实现乐观锁)(商品详情的版本号)


}
