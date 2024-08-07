/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:24:54
 * @filename User.ts
 * @description
 *
 */
import {Gender} from "@/enums/Gender";
import {UserStatus} from "@/enums/UserStatus";

export interface User {


    id?: number; // 用户ID号
    account?: string; // 用户账号
    password?: string; // 用户密码（加密）
    phone?: string; // 用户绑定的手机号
    email?: string; // 用户邮箱
    nickname?: string; // 用户昵称
    realname?: string; // 用户真实姓名（管理员必需）
    gender?: Gender; // 用户性别
    idiograph?: string; // 用户的个性签名
    avatar?: string; // 用户头像(JSON)
    background?: string; // 用户个人资料背景图片(JSON)（同上）
    likeNum?: number; // 用户被点赞数量
    userRank?: number; // 用户等级
    birthDate?: Date; // 用户出生年月
    address?: string; // 用户家庭地址信息
    bindAccounts?: string[]; // 用户绑定的其他账号
    credit?: number; // 用户信誉积分
    status?: UserStatus; // 用户当前状态
    meta?: { [key: string]: any }; // 用户其他数据配置(JSON)
    roleId?: number; // 用户角色ID
    assetId?: number; // 用户资产ID
    createTime?: Date; // 用户注册时间
    updateTime?: Date; // 用户资料修改时间
    isDeleted?: number; // 用户是否已被删除
    version?: number; // 当前实体的版本（用于辅助实现乐观锁）


}
