/**
 *
 * @author LiGuanda
 * @date 2024/2/9 下午 3:44:54
 * @description 用于作为超级管理员类实体
 * @class Administrator
 * @filename Administrator.ts
 *
 */

export default interface Administrator {


    readonly id: number;
    account: string;
    password: string;
    role: string;
    level: number;
    nickname: string;
    avatar: string;
    registerDate: number;
    sex: string;
    address: string;
    realname: string;
    credit: number;
    addition: string;


}
