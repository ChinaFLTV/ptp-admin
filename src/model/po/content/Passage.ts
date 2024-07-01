/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 6:54:23
 * @filename Passage.ts
 * @description 文章的实体类(PO)
 *
 */
import BaseEntity from "@/model/base/content/BaseEntity";


export interface Passage extends BaseEntity {


    introduction?: string; // 内容介绍


}
