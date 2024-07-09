/**
 *
 * @author Lenovo
 * @date 2024/7/8 AM 10:08:25
 * @filename index.ts
 * @description 完成APP路由相关的配置
 *
 */

import * as VueRouter from "vue-router";
import {routes} from "@/router/modules/routes";
import {NavigateStore} from "@/store/modules/navigate";
import randomUUID from "@/utils/uuid";
import {NavigationType} from "@/enums/NavigationType";
import {Page} from "@/model/view/page";
import {App} from "vue";


// 2024-2-7  15:24-每个路由都需要映射到一个组件
// 2024-2-7  15:20-进行Vue路由初始化相关工作
const router: VueRouter.Router = VueRouter.createRouter({

    // 2024-7-8  10:12-createWebHashHistory URL带#，createWebHistory URL不带#
    // 2024-2-7  15:22-内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式
    history: VueRouter.createWebHashHistory(),
    // @ts-ignore
    routes,
    strict: true,
    scrollBehavior: () => ({

        top: 0,
        left: 0

    })

});


const navigateStore = NavigateStore();
router.beforeEach(to => {

    switch (parseInt(to.query.type as string)) {

        case NavigationType.PROFILE:
        case NavigationType.DASHBOARD:
        case NavigationType.CONTENT_MANAGE:
        case NavigationType.USER_MANAGE:
        case NavigationType.VERSION_CONTROL:

            const page: Page = {

                titlePlaceholder: "",
                titleKey: to.meta.titleKey as string,
                name: to.name.toString(),
                path: to.path,
                openTime: new Date(),
                id: randomUUID(),
                draggable: true,
                closeable: true,
                cached: true

            };

            if (navigateStore.openedPages.filter(p => p.path == page.path).length > 0) {

                // 2024-4-18  15:24-说明已经打开过相同标签，此时直接跳回已打开的相同标签
                const index = navigateStore.openedPages.findIndex(p => p.path == page.path);
                navigateStore.currentOpenedPage = navigateStore.openedPages[index];

            } else {

                navigateStore.openedPages.push(page);
                navigateStore.currentOpenedPage = page;

            }

            break;

        case NavigationType.LOGIN:
        case NavigationType.LOGOUT:
        case NavigationType.TAB_EXCHANGE:
        case NavigationType.TAB_CLOSE:
        default:

            break;

    }

    return true;

});

// 2024-7-8  14:11-注册全局后置钩子 , 以便根据字符串key依据区域配置动态显示国际化标题
/*router.afterEach((to) => {

    const {t} = i18n.global;
    to.meta.title = t(to.meta.titleKey as string) as string;

});*/


/**
 *
 * @author Lenovo
 * @date 2024/7/8 AM 10:13:42
 * @filename index.ts
 * @param app Vue应用实例
 * @description 配置路由插件
 *
 */
export function setupRouter(app: App<Element>) {

    app.use(router);

}


export default router;
