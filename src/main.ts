import "./assets/main.css";

import {createApp} from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as VueRouter from "vue-router";
import {createPinia} from "pinia";
import {routes} from "@/router/Routes";


// @ts-ignore
const app = createApp(App);


// 2024-2-7  15:24-每个路由都需要映射到一个组件
// 2024-2-7  15:20-进行Vue路由初始化相关工作
const router = VueRouter.createRouter({

    // 2024-2-7  15:22-内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式
    history: VueRouter.createWebHashHistory(),
    // @ts-ignore
    routes

});
app.use(router);

// 2024-2-8  21:41-初始化Pinia数据管理框架
const pinia = createPinia();
app.use(pinia);

app.use(ElementPlus);

// 2024-2-12  10:54-启动图片预览开源库V-Viewer
//app.use(VueViewer);

// 2024-2-13  14:37-引入地址选择器组件v-distpicker
//app.component("v-distpicker", Distpicker);

app.mount("#main-area");
