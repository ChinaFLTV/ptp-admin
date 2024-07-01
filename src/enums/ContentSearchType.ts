/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:18:41
 * @filename ContentSearchType.ts
 * @description 内容查询类型的枚举类
 *
 */

export enum ContentSearchType {


    DIALOGUE = 901, // 对话
    PASSAGE = 902, // 文章
    PASSAGE_COMMENT = 903, // 文章评论
    USER = 904, // 用户
    ROLE = 904, // 角色 (注：此处code值与USER相同，可能是错误)
    ASSET = 905 // 财产


}
