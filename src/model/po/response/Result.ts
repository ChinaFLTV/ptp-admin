/**
 *
 * @param <T> 包装数据的类型
 * @author Lenovo
 * @date 2024/7/1 PM 8:10:42
 * @filename Result.ts
 * @description 响应数据的类型
 *
 */
import {ResponseStatus} from "@/enums/ResponseStatus";

export interface Result<T> {


    status?: ResponseStatus; // 响应状态
    time?: Date; // 响应时间
    data?: T; // 响应数据


}
