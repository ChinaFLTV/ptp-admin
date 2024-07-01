/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:13:37
 * @filename AddressInfo.ts
 * @description 封装地址信息
 *
 */

export interface AddressInfo {


    id?: number; // 地址ID
    altitude?: number; // 海拔高度
    longitude?: number; // 经度
    latitude?: number; // 纬度
    country?: string; // 所在国家
    countryID?: string; // 所在国家ID
    province?: string; // 所在省份/州
    provinceID?: string; // 所在省份/州ID
    city?: string; // 所在市
    cityID?: string; // 所在市ID
    county?: string; // 所在县
    countyID?: string; // 所在县ID
    detailedLocation?: string; // 详细地址


}
