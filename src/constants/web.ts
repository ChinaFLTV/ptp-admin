/**
 *
 * @author Lenovo
 * @date 2024/7/11 PM 10:57:25
 * @filename web.ts
 * @description 存储Web相关的常量数据(路径常量要求一律不以/结尾)
 *
 */

// 2024-8-25  21:08-本机的外网IP
export let SERVER_IP: string = "192.168.124.9";
// 2024-7-11  22:58-PTP在线站点的链接地址
export const PTP_WEB_SITE_URL: string = `http://${SERVER_IP}:8150`;
// 2024-8-23  17:35-PTP在线站点的WebSocket链接地址
export const PTP_WEB_SITE_WEBSOCKET_URL: string = `ws://${SERVER_IP}:8150`;


// 2024-8-1  21:15-PTP 网关微服务模块的上下文基地址
export const PTP_GATEWAY_CONTEXT_URL: string = "/api/v1/service/gateway";
// 2024-8-1  12:21-PTP web微服务模块的上下文基地址
export const PTP_WEB_CONTEXT_URL: string = "/api/v1/web";


// 2024-8-1  12:19-announcement子模块的基地址
export const PTP_ANNOUNCEMENT_BASE_URL: string = "/content/announcement";
// 2024-8-1  12:24-dialogue子模块的基地址
export const PTP_DIALOGUE_BASE_URL: string = "/content/dialogue";
// 2024-8-1  12:24-passage子模块的基地址
export const PTP_PASSAGE_BASE_URL: string = "/content/passage";
// 2024-8-1  12:25-passage comment子模块的基地址
export const PTP_PASSAGE_COMMENT_BASE_URL: string = "/content/passage/comment";
// 2024-8-1  12:25-user子模块的基地址
export const PTP_USER_BASE_URL: string = "/content/user";
// 2024-8-1  12:26-user role子模块的基地址
export const PTP_USER_ROLE_BASE_URL: string = "/content/user/role";
// 2024-8-4  17:49-user login子模块的基地址
export const PTP_USER_LOGIN_BASE_URL: string = "/gate";
// 2024-8-23  17:09-user 群聊子模块的基地址
export const PTP_USER_CHAT_BASE_URL: string = "/content/user/chat";
// 2024-8-25  21:40-system 状态数据子模块的基地址
export const PTP_SYSTEM_STATUS_BASE_URL: string = "/system/status";


export const USER_LOGIN_COOKIE_KEY: string = "login_client_info"; // 2024-8-7  14:31-用户登录的环境信息Cookie对应的key


export const DEFAULT_CHAT_ROOM_ID: number = 666; // 2024-8-23  20:41-默认的群聊房间ID
