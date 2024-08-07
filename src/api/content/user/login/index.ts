/**
 *
 * @author Lenovo
 * @date 2024/8/4 PM 5:32:06
 * @filename index.ts
 * @description 用户登录环境相关的API接口
 *
 */
import {Result} from "@/model/po/response/Result";
import {service} from "@/config/axios/service";
import {PTP_USER_LOGIN_BASE_URL} from "@/constants/web";
import {UserLoginVo} from "@/model/vo/UserLoginVo";
import {usePermissionStore} from "@/store/modules/permisssion";
import {LoginClientType} from "@/enums/LoginClientType";
import {UserDataStore} from "@/store/modules/user";
import {User} from "@/model/po/manage/User";


/**
 *
 * @author LiGuanda
 * @return {Result<Map<string, any>>} 用户登录成功后得到的本地登录环境的加密信息与云端敏感信息缓存KEY的Map
 * @param nickname {string} 用户名
 * @param password {string} 用户密码
 * @date 2024/8/4 PM 5:44:09
 * @filename index.ts
 * @description 普通登录(用户名+密码)
 *
 */
export const loginByNicknameAndPassword = async (nickname: string, password: string): Promise<Result<Map<string, any>>> => {

    const userLoginVo: UserLoginVo = {
        nickname,
        password,
        loginInfo: {
            uid: 5,
            deviceInfo: {
                deviceID: "WEB:588628196248426",
                model: "sunt amet consectetur consequat ea",
                macAddress: "陕西省衢州市-",
                manufacturer: "Ut",
                versionIID: 34,
                versionOID: "91",
                isAdbEnabled: false,
                isRooted: true,
                isTablet: false,
                isEmulator: true,
                ABIs: [
                    "ad id non"
                ],
                AndroidID: "83",
                SDKVersionName: "话题参",
                SDKVersionCode: 32
            },
            addressInfo: {
                id: 29,
                altitude: 44,
                longitude: 11,
                latitude: 25,
                country: "non ut amet",
                countryID: "72",
                province: "福建省",
                provinceID: "25",
                city: "昌吉回族自治州",
                cityID: "48",
                county: "nostrud commodo",
                countyID: "64",
                detailedLocation: "dolor ullamco eu"
            },
            networkInfo: {
                ipv4: "ipsum pariatur dolor",
                ipv6: "dolor",
                isp: "tempor commodo adipisicing ad"
            }
        }
    };

    const permissionStore = usePermissionStore();
    const userDataStore = UserDataStore();

    const loginInfo: Result<Map<string, any>> = await service.post(`${PTP_USER_LOGIN_BASE_URL}/login`, userLoginVo) as Result<Map<string, any>>;

    const STORE_KEY: string = loginInfo["data"]["store_key"]; // 2024-8-6  00:44-这就是后续请求都需要带上的权限验证Header——Authorization
    const user: User = loginInfo["data"]["user"];

    permissionStore.updateAuthorization(STORE_KEY);
    userDataStore.updateUserData(user);

    return loginInfo;

};


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/7 PM 2:16:16
 * @filename index.ts
 * @param clientType {LoginClientType} 当前需要进行登出操作的客户端类型(保证单端单登录/登出)
 * @param userId {number} 用户ID
 * @return {Promise<any>} 服务端返回的登出消息
 * @description 登出用户并移除用户本地数据信息
 *
 */
export const logout = async (clientType: LoginClientType, userId: number): Promise<Result<any>> => {

    const permissionStore = usePermissionStore();
    // const cookie = useCookie();
    const userDataStore = UserDataStore();

    const res = await service.post(`${PTP_USER_LOGIN_BASE_URL}/logout`, null, {

            params: {

                clientType: clientType.valueOf(),
                userId

            }

        })
    ;

    // 2024-8-7  14:24-清除客户端浏览器的用户信息缓存
    permissionStore.removeAuthorization();
    // 2024-8-7  14:41-Cookie中的数据不需要由客户端来主动删除 , 而是由服务端回复的Response的Set-Cookie进行删除
    // cookie.remove(USER_LOGIN_COOKIE_KEY);

    userDataStore.removeUserData();

    return res;

};
