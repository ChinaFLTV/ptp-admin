/**
 *
 * @author Lenovo
 * @date 2024/2/16 下午 1:36:15
 * @filename page.ts
 * @description 用于规定导航页面的类型
 *
 */

export interface Page {

    titlePlaceholder: string,
    titleKey?: string,
    name: string,
    path: string,
    id: number,
    openTime: Date,
    draggable: boolean,
    closeable: boolean,
    cached: boolean

}
