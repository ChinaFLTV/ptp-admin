/**
 *
 * @author LiGuanda
 * @date 2024/2/12 下午 12:58:58
 * @filename service.ts
 * @description 用于提供统一的HTTP请求服务
 *
 */
import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {config} from "../web/config";
import {usePermissionStore} from "@/store/modules/permisssion";
import {ResponseStatus} from "@/enums/ResponseStatus";
import {PtpException} from "@/exceptions/PtpException";

export const service: AxiosInstance = axios.create({

    baseURL: config.base_url, // 2024-7-1  18:17-基础服务地址 , 这个值会被添加到实际请求 URL 的前面
    timeout: config.request_timeout, // 2024-7-1  18:17-超时时间 , 单位是毫秒
    withCredentials: true, // 2024-7-1  18:18-是否携带cookie发送跨域请求 , 默认为 false
    headers: {

        Authorization: "BLANK AUTHORIZATION"

    }

});


// 2024-7-1  18:31-为每一次的请求自动添加TOKEN请求头(如果本地有TOKEN缓存的话)
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {

        // 2024-8-6  21:57-更新最新的令牌信息
        const permissionStore = usePermissionStore();
        config.headers["Authorization"] = permissionStore?.getAuthorization;

        return config;

    }
);


// 2024-7-1  18:22-剔除掉Axios自动为响应数据添加的额外数据 , 直接将最终的响应数据转换为服务端真正返回的响应数据
service.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {

        if (response.data) {

            // 2024-8-8  17:48-处理HTTP层面正常单业务层面异常的情况
            if (response.data.status === ResponseStatus.FAILURE) {

                // 2024-8-8  17:45-将响应包装为异常给后续业务调用
                throw new PtpException(response.data);

            }
            return response.data;

        }

        throw new PtpException("Invalid response data!");

    }
);
