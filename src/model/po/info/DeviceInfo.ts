/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:14:19
 * @filename DeviceInfo.ts
 * @description 设备信息
 *
 */

export interface DeviceInfo {


    deviceID?: string; // 设备唯一标识码
    model?: string; // 设备型号
    macAddress?: string; // 设备MAC地址
    manufacturer?: string; // 设备厂商
    isTablet?: boolean; // 是否是平板
    isEmulator?: boolean; // 是否是模拟器
    ABIs?: string[]; // 设备ABIs
    AndroidID?: string; // 设备AndroidID
    isRooted?: boolean; // 设备是否rooted
    isAdbEnabled?: boolean; // 判断设备 ADB 是否可用
    SDKVersionName?: string; // 获取设备系统版本号
    SDKVersionCode?: number; // 获取设备系统版本码
    versionIID?: number; // 当前应用内部版本号
    versionOID?: string; // 当前应用外部版本号


}
