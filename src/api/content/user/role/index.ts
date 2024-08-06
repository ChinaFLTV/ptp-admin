/**
 * 角色相关API接口
 * @author LiGuanda
 * @date 2024/8/7 AM 12:22:04
 * @filename index.ts
 */

import {service} from "@/config/axios/service";
import {Result} from "@/model/po/response/Result";
import {Role} from "@/model/po/manage/Role";
import {RoleVo} from "@/model/vo/RoleVo";
import {PTP_USER_ROLE_BASE_URL} from "@/constants/web";

/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:22:04
 * @filename index.ts
 * @description 根据角色ID查询特定的角色信息
 * @param id 角色的唯一标识符
 * @returns 返回查询到的角色信息
 */
export const querySingleRole = async (id: number): Promise<Result<Role>> => {

    return await service.get(`${PTP_USER_ROLE_BASE_URL}/query/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:22:04
 * @filename index.ts
 * @description 通过分页方式批量查询角色数据
 * @param offset 分页查询的起始偏移量
 * @param limit 分页查询的每页数据量限制
 * @returns 返回查询到的多个角色信息
 */
export const queryRolePage = async (offset: number, limit: number): Promise<Result<Role[]>> => {

    return await service.get(`${PTP_USER_ROLE_BASE_URL}/query/page/${offset}/${limit}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:22:04
 * @filename index.ts
 * @description 添加新的角色记录到系统中
 * @param roleVo 包含新角色信息的值对象
 * @returns 返回添加操作的结果
 */
export const insertSingleRole = async (roleVo: RoleVo): Promise<Result<any>> => {

    return await service.post(`${PTP_USER_ROLE_BASE_URL}/insert/single`, roleVo);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:22:04
 * @filename index.ts
 * @description 更新系统中的角色记录
 * @param roleVo 包含更新信息的角色值对象
 * @returns 返回更新操作的结果
 */
export const updateSingleRole = async (roleVo: RoleVo): Promise<Result<any>> => {

    return await service.put(`${PTP_USER_ROLE_BASE_URL}/update/single`, {data: roleVo});

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:22:04
 * @filename index.ts
 * @description 根据ID删除系统中的角色记录
 * @param id 需要删除的角色的ID
 * @returns 返回删除操作的结果
 */
export const deleteSingleRole = async (id: number): Promise<Result<any>> => {

    return await service.delete(`${PTP_USER_ROLE_BASE_URL}/delete/single/${id}`);

};


/**
 * @author LiGuanda
 * @date 2024/8/7 AM 12:22:04
 * @filename index.ts
 * @description 查询所有角色信息
 * @returns 返回所有角色的信息列表
 */
export const queryAllRoles = async (): Promise<Result<Role[]>> => {

    return await service.get(`${PTP_USER_ROLE_BASE_URL}/query/all`);

};
