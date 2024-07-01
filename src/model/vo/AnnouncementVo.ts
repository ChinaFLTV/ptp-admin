/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:56:32
 * @filename AnnouncementVo.ts
 * @description 公告的展示类(VO)
 *
 */
import {AddressInfo} from "@/model/po/info/AddressInfo";


export interface AnnouncementVo {


    id?: number; // 公告ID
    uid?: number; // 发布者ID
    title?: string; // 公告标题
    content?: string; // 公告内容
    accessary?: string; // 附加的其他类型的媒体内容(JSON格式)
    tags?: string[]; // 标签
    category?: string[]; // 分类
    addressInfo?: AddressInfo; // 发布时用户所在的地址信息


}
