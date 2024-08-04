/**
 *
 * @author Lenovo
 * @date 2024/8/4 PM 5:32:06
 * @filename index.ts
 * @description 用户登录环境相关的API接口
 *
 */
import {UserLoginVo} from "@/model/vo/UserLoginVo";
import {Result} from "@/model/po/response/Result";
import {service} from "@/config/axios/service";
import {PTP_USER_LOGIN_BASE_URL} from "@/constants/web";


/**
 *
 * @author LiGuanda
 * @return {Result<Map<string, any>>} 用户登录成功后得到的本地登录环境的加密信息与云端敏感信息缓存KEY的Map
 * @param userloginVo {UserLoginVo} 用户登录环境数据包
 * @date 2024/8/4 PM 5:44:09
 * @filename index.ts
 * @description 普通登录(用户名+密码)
 *
 */
export const login = async (userloginVo: UserLoginVo): Promise<Result<Map<string, any>>> => {


    return await service.post(PTP_USER_LOGIN_BASE_URL + "/login", userloginVo) as Result<Map<string, any>>;

};
