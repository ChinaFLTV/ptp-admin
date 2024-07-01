/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 8:05:17
 * @filename UserLoginVo.ts
 * @description 前端传输过来的用户登录的部分数据
 *
 */
import {LoginInfo} from "@/model/po/info/LoginInfo";


export interface UserLoginVo {


    nickname?: string; // 用户昵称
    password?: string; // 用户密码
    loginInfo?: LoginInfo; // 用户登录的其他信息


}
