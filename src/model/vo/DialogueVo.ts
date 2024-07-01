/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:58:55
 * @filename DialogueVo.ts
 * @description 客户端传过来的对话数据
 *
 */
import {AddressInfo} from "@/model/po/info/AddressInfo";


export interface DialogueVo {


    id?: number; // ID
    uid?: number; // 发布者ID
    title?: string; // 标题
    content?: string; // 对话内容
    accessary?: string; // 附加的其他类型的媒体内容(JSON格式)
    tags?: string[]; // 标签
    category?: string[]; // 分类
    browseNum?: number; // 浏览量
    likeNum?: number; // 点赞量
    addressInfo?: AddressInfo; // 发布时用户所在的地址信息
    createTime?: Date; // 内容创建时间


}
