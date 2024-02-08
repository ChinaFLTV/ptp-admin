import "./assets/main.css";

import {createApp} from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Login from "@/views/person/login.vue";
import * as VueRouter from "vue-router";
import MainPage from "@/components/main/MainPage.vue";


// @ts-ignore
const app = createApp(App);


// 2024-2-7  15:24-每个路由都需要映射到一个组件
// 2024-2-7  15:20-进行Vue路由初始化相关工作
const routes = [

    {

        path: "/login",
        name: "login",
        component: Login

    },
    {

        path: "/main",
        name: "main",
        component: MainPage

    }

];


const router = VueRouter.createRouter({

    // 2024-2-7  15:22-内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式
    history: VueRouter.createWebHashHistory(),
    // @ts-ignore
    routes

});
app.use(router);

app.use(ElementPlus);
app.mount("#main-area");
