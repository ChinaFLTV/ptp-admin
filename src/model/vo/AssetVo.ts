/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 7:57:19
 * @filename AssetVo.ts
 * @description 前端传输过来的Asset的部分数据
 *
 */
import {AssetStatus} from "@/enums/AssetStatus";

export interface AssetVo {


    id?: number; // ID
    balance?: number; // 当前用户的余额
    accounts?: string[]; // 绑定的银行卡
    authorities?: string[]; // 当前账户所允许的操作
    credit?: number; // 当前账户的信誉积分
    status?: AssetStatus; // 当前账户状态


}
