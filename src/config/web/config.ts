/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 4:06:17
 * @filename config.ts
 * @description Web相关的数据配置
 *
 */
import {PTP_WEB_CONTEXT_URL, PTP_WEB_SITE_URL} from "@/constants/web";

// noinspection HttpUrlsUsage
const config = {

    /**
     *
     * @author Lenovo
     * @date 2024/7/2 PM 4:10:53
     * @filename config.ts
     * @description api请求的基础路径(包含网关&Web微服务模块的上下文路径)
     *
     */
    base_url: PTP_WEB_SITE_URL + PTP_WEB_CONTEXT_URL,
    /**
     *
     * @author Lenovo
     * @date 2024/7/2 PM 4:11:15
     * @filename config.ts
     * @description 接口请求的超时时间(单位 : ms)
     *
     */
    request_timeout: 10_000

};


export {

    config

};
