/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 4:33:27
 * @filename index.ts
 * @description 用户登录相关的API
 *
 */
import {service} from "@/config/axios/service";


/**
 *
 * @author Lenovo
 * @param account 用户账号
 * @param password 用户密码
 * @return 用户登录的响应数据
 * @date 2024/7/2 PM 4:36:13
 * @filename index.ts
 * @description 通过用户账号和密码进行用户登录
 *
 */
export async function loginByAccountAndPassword(account: String, password: String): Promise<any> {

    return await service.get("/manage/administrator/get/single/byAccountAndPassword", {

        params: {

            account,
            password

        }

    });

}
