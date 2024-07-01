/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 8:34:44
 * @filename Action.ts
 * @description 标识用户的行为
 *
 */

export enum Action {


    LIKE = 401, // 点赞
    UNLIKE = 402, // 取消点赞
    STAR = 403, // 收藏
    UNSTAR = 404, // 取消收藏
    BROWSE = 405, // 浏览
    COMMENT = 406, // 评论
    SUBSCRIBE = 407, // 关注
    UNSUBSCRIBE = 408 // 取消关注


}
