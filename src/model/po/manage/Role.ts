/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:23:53
 * @filename Role.ts
 * @description 用户角色实体类(PO)
 *
 */

export interface Role {


    id?: number; // 角色ID
    name?: string; // 角色名称
    authorities?: string[]; // 角色所具有的权限
    prohibition?: string[]; // 角色所不被允许的权限
    createTime?: Date; // 角色建立时间
    updateTime?: Date; // （最后）修改时间
    isDeleted?: number; // 角色是否已被删除
    version?: number; // 当前实体的版本（用于辅助实现乐观锁）


}
