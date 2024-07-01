/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:23:07
 * @filename Asset.ts
 * @description 用户资产
 *
 */
import {AssetStatus} from "@/enums/AssetStatus";

export interface Asset {


    id?: number; // ID
    balance?: number; // 当前用户的余额
    accounts?: string[]; // 绑定的银行卡
    authorities?: string[]; // 当前账户所允许的操作
    credit?: number; // 当前账户的信誉积分
    status?: AssetStatus; // 当前账户状态
    createTime?: Date; // 资产创建时间
    updateTime?: Date; // （最后）修改时间
    isDeleted?: number; // 资产信息是否已被删除
    version?: number; // 当前实体的版本（用于辅助实现乐观锁）


}
