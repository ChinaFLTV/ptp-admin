/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/25 PM 9:38:45
 * @filename index.ts
 * @description 服务端状态数据相关的API接口
 *
 */
import {service} from "@/config/axios/service";
import {PTP_SYSTEM_STATUS_BASE_URL} from "@/constants/web";
import {Result} from "@/model/po/response/Result";


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/25 PM 9:42:23
 * @filename index.ts
 * @description 查询服务器的IP地址
 * @return {string} 服务器的公网IP地址
 *
 */
export const queryServerIp = async (): Promise<Result<string>> => {

    return await service.get(`${PTP_SYSTEM_STATUS_BASE_URL}/query/server/ip`);

};


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/25 PM 9:43:04
 * @filename index.ts
 * @description 查询客户端的IP地址
 * @return {string} 客户端的公网IP地址
 *
 */
export const queryClientIp = async (): Promise<Result<string>> => {

    return await service.get(`${PTP_SYSTEM_STATUS_BASE_URL}/query/client/ip`);

};
