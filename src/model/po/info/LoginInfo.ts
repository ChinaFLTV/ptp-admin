/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:15:06
 * @filename LoginInfo.ts
 * @description 用户登录信息
 *
 */
import {DeviceInfo} from "@/model/po/info/DeviceInfo";
import {AddressInfo} from "@/model/po/info/AddressInfo";
import {NetworkInfo} from "@/model/po/info/NetworkInfo";

export interface LoginInfo {


    uid?: number; // 用户ID
    loginDatetime?: Date; // 登录时间
    deviceInfo?: DeviceInfo; // 登录设备信息
    addressInfo?: AddressInfo; // 登录地址信息
    networkInfo?: NetworkInfo; // 登录网络信息


}
