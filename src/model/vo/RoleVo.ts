/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 8:03:27
 * @filename RoleVo.ts
 * @description 前端传输过来的角色的部分数据
 *
 */

export interface RoleVo {


    id?: number; // 角色ID
    name?: string; // 角色名称
    authorities?: string[]; // 角色所具有的权限
    prohibition?: string[]; // 角色所不被允许的权限


}
