/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:25:26
 * @filename Role.ts
 * @description 指明用户角色
 *
 */

export enum Role {


    USER = 11, // 正常用户
    VIP_USER = 12, // VIP用户
    SVIP_USER = 13, // SVIP用户
    ABNORMAL_USER = 15, // 状态异常用户
    BLOCKED_USER = 16, // 封禁用户
    VISITOR = 17, // 游客
    ADMINISTRATOR = 18, // 管理员
    SUPER_ADMINISTRATOR = 19 // 超级管理员


}
