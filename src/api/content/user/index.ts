/**
 * 用户相关API接口
 * @author LiGuanda
 * @date 2024/8/7 AM 12:00:35
 * @filename index.ts
 */

import {service} from "@/config/axios/service";
import {PTP_USER_BASE_URL} from "@/constants/web";
import {Result} from "@/model/po/response/Result";
import {User} from "@/model/po/manage/User";
import {UserVo} from "@/model/vo/UserVo";
import {AddressInfo} from "@/model/po/info/AddressInfo";

/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:00:35
 * @filename index.ts
 * @description 根据用户ID查询特定的用户信息
 * @param id 用户的唯一标识符
 * @returns 返回查询到的用户信息
 */
export const querySingleUser = async (id: number): Promise<Result<User>> => {

    return await service.get(`${PTP_USER_BASE_URL}/query/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:00:35
 * @filename index.ts
 * @description 通过分页方式批量查询用户数据
 * @param offset 分页查询的起始偏移量
 * @param limit 分页查询的每页数据量限制
 * @returns 返回查询到的多个用户信息
 */
export const queryUserPage = async (offset: number, limit: number): Promise<Result<User[]>> => {

    return await service.get(`${PTP_USER_BASE_URL}/query/page/${offset}/${limit}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:00:35
 * @filename index.ts
 * @description 添加新的用户记录到系统中
 * @param userVo 包含新用户信息的值对象
 * @returns 返回添加操作的结果
 */
export const insertSingleUser = async (userVo: UserVo): Promise<Result<any>> => {

    return await service.post(`${PTP_USER_BASE_URL}/insert/single`, userVo);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:00:35
 * @filename index.ts
 * @description 更新系统中的用户记录
 * @param userVo 包含更新信息的用户值对象
 * @returns 返回更新操作的结果
 */
export const updateUser = async (userVo: UserVo): Promise<Result<any>> => {

    return await service.put(`${PTP_USER_BASE_URL}/update/single`, {data: userVo});

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:00:35
 * @filename index.ts
 * @description 根据ID删除系统中的用户记录
 * @param id 需要删除的用户的ID
 * @returns 返回删除操作的结果
 */
export const deleteUser = async (id: number): Promise<Result<any>> => {

    return await service.delete(`${PTP_USER_BASE_URL}/delete/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:17:10
 * @filename index.ts
 * @description 查询所有用户信息
 * @returns 返回所有用户的信息列表
 */
export const queryAllUsers = async (): Promise<Result<User[]>> => {

    return await service.get(`${PTP_USER_BASE_URL}/query/all`);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:17:10
 * @filename index.ts
 * @description 根据用户当前的地理位置信息，查找附近的用户
 * @param userId 当前用户的ID
 * @param addressInfo 用户的地理位置信息
 * @returns 返回附近用户的信息列表
 */
export const findPeopleNearby = async (userId: number, addressInfo: AddressInfo): Promise<Result<Map<number, User[]>>> => {

    return await service.post(`${PTP_USER_BASE_URL}/query/nearby`, {userId, addressInfo});

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:17:10
 * @filename index.ts
 * @description 更新用户当前的地理位置信息
 * @param userId 用户的ID
 * @param addressInfo 用户新的地理位置信息
 * @returns 返回更新地理位置后的用户信息
 */
export const refreshGeolocation = async (userId: number, addressInfo: AddressInfo): Promise<Result<User>> => {

    return await service.post(`${PTP_USER_BASE_URL}/refresh/geolocation/${userId}`, addressInfo);

};
