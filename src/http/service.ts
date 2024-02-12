/**
 *
 * @author LiGuanda
 * @date 2024/2/12 下午 12:58:58
 * @filename service.ts
 * @description 用于提供统一的HTTP请求服务
 *
 */
import axios, {AxiosInstance} from "axios";

const service: AxiosInstance = axios.create({

    baseURL: "http://119.45.0.82:8080/"

});

export default service;
