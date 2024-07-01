import "./assets/main.css";

import {createApp} from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as VueRouter from "vue-router";
import {createPinia, Pinia} from "pinia";
import {routes} from "@/router/Routes";
import {NavigateStore} from "@/store/navigate";
import randomUUID from "@/utils/uuid";
import {NavigationType} from "@/enums/NavigationType";
import {Page} from "@/model/view/page";
// 导入中文
import zhCn from "element-plus/dist/locale/zh-cn.mjs";


// @ts-ignore
const app: App<Element> = createApp(App);


// 2024-2-7  15:24-每个路由都需要映射到一个组件
// 2024-2-7  15:20-进行Vue路由初始化相关工作
const router: VueRouter.Router = VueRouter.createRouter({

    // 2024-2-7  15:22-内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式
    history: VueRouter.createWebHashHistory(),
    // @ts-ignore
    routes

});


// 2024-2-8  21:41-初始化Pinia数据管理框架
const pinia: Pinia = createPinia();
app.use(pinia);


const navigateStore = NavigateStore();
router.beforeEach((to: VueRouter.RouteLocationNormalizedGeneric) => {

    switch (parseInt(to.query.type as string)) {

        case NavigationType.PROFILE:
        case NavigationType.DASHBOARD:
        case NavigationType.CONTENT_MANAGE:
        case NavigationType.USER_MANAGE:
        case NavigationType.VERSION_CONTROL:

            const page: Page = {

                title: to.meta.title as string,
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
app.use(router);


app.use(ElementPlus, {

    // 2024-2-18  15:29-调整ElementPlus语言为中文
    locale: zhCn

});

// 2024-2-12  10:54-启动图片预览开源库V-Viewer
//app.use(VueViewer);

// 2024-2-13  14:37-引入地址选择器组件v-distpicker
//app.component("v-distpicker", Distpicker);

app.mount("#main-area");
