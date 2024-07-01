/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 8:02:15
 * @filename PassageVo.ts
 * @description 前端传输过来的Passage的部分数据
 *
 */
import {AddressInfo} from "@/model/po/info/AddressInfo";


export interface PassageVo {


    id?: number; // 文章ID
    uid?: number; // 发布者ID
    title?: string; // 文章标题
    introduction?: string; // 文章内容引子
    content?: string; // 文章内容
    accessary?: string; // 附加的其他类型的媒体内容(JSON格式)
    tags?: string[]; // 文章标签
    category?: string[]; // 文章分类
    browseNum?: number; // 浏览量
    likeNum?: number; // 点赞量
    unlikeNum?: number; // 倒赞量
    commentNum?: number; // 评论量
    starNum?: number; // 收藏量
    addressInfo?: AddressInfo; // 发布时用户所在的地址信息


}
