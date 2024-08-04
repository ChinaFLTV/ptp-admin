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

export const service: AxiosInstance = axios.create({

    baseURL: config.base_url, // 2024-7-1  18:17-基础服务地址 , 这个值会被添加到实际请求 URL 的前面
    timeout: config.request_timeout, // 2024-7-1  18:17-超时时间 , 单位是毫秒
    withCredentials: true, // 2024-7-1  18:18-是否携带cookie发送跨域请求 , 默认为 false
    headers: {

        Authorization: "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJwdHAtdXNlci1sb2dpbi1pbmZvIiwib2JqZWN0X2luZm8iOiIxIiwiaXNzIjoiSVNTIiwiaWF0IjoxNzIyNjA5ODQ5LCJleHAiOjE3MjMyMTQ2NDksImp0aSI6InB0cC1vYmplY3Qtand0In0.l7JwhgAJcBqzRDo9XBrHO9CUI2pnkt-IKk9nfYT3Nq8"

    }

});


// 2024-7-1  18:31-为每一次的请求自动添加TOKEN请求头(如果本地有TOKEN缓存的话)
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {

        const token: String = localStorage.getItem("token");

        return config;

    }
);


// 2024-7-1  18:22-剔除掉Axios自动为响应数据添加的额外数据 , 直接将最终的响应数据转换为服务端真正返回的响应数据
service.interceptors.response.use(
    (response: AxiosResponse<any, any>) => response.data
);
