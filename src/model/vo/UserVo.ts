/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 8:06:15
 * @filename UserVo.ts
 * @description 前端传输过来的User的部分数据
 *
 */
import {Gender} from "@/enums/Gender";


export interface UserVo {


    id?: number; // 用户ID号
    account?: string; // 用户账号
    password?: string; // 用户密码(加密)
    phone?: string; // 用户绑定的手机号
    email?: string; // 用户邮箱
    nickname?: string; // 用户昵称
    realname?: string; // 用户真实姓名(管理员必需)
    gender?: Gender; // 用户性别
    idiograph?: string; // 用户的个性签名
    avatar?: string; // 用户头像(JSON)
    background?: string; // 用户个人资料背景图片(JSON)
    likeNum?: number; // 用户被点赞数量
    userRank?: number; // 用户等级
    birthDate?: Date; // 用户出生年月
    addressInfoId?: number; // 用户地址信息ID
    bindAccounts?: string[]; // 用户绑定的其他账号
    credit?: number; // 用户信誉积分
    roleId?: number; // 用户角色ID
    assetId?: number; // 用户资产ID


}
