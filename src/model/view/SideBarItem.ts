/**
 *
 * @author Lenovo
 * @date 2024/4/18 PM 7:26:39
 * @filename SideBarItem.ts
 * @description 侧边栏的item的抽象实体
 *
 */

export interface SideBarItem {


    title: string; // 2024-4-19  16:37-侧边栏Item的标题
    titleKey: string, // 2024-7-9  23:33-title对应的当前区域语言的键
    name: string; // 2024-4-19  16:38-侧边栏Item的name(备用的唯一标识)
    icon: string; // 2024-4-19  16:38-侧边栏Item的图标


}
