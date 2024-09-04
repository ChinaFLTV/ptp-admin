import "./assets/main.css";

import {App as VueApp, createApp} from "vue";
import App from "@/App.vue";
import "element-plus/dist/index.css";

// 2024-7-2  20:00-问题解决地址 : https://github.com/element-plus/element-plus/issues/13614
// 导入中文
import {setI18n} from "@/plugins/vueI18n";
import {setupStore} from "@/store";
import {setupCustomDirectives} from "@/directives";
import {setupRouter} from "@/router";
import {setupElementPlus} from "@/plugins/elementPlus";
import {install} from "@icon-park/vue-next/es/all";
import {ElMessage} from "element-plus";

/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 6:55:41
 * @filename main.ts
 * @param app Vue应用实例
 * @description 配置APP插件
 *
 */
function configPlugins(app: VueApp<Element>) {

    // 2024-2-8  21:41-初始化Pinia数据管理框架
    setupStore(app);

    // 2024-7-4  17:51-设置自定义Vue指令
    setupCustomDirectives(app);

    // 2024-7-2  18:53-配置语言国际化
    setI18n(app);

    // 2024-7-8  10:14-配置路由
    setupRouter(app);

    // 2024-7-8  10:21-配置Element Plus UI框架
    setupElementPlus(app);

    // 2024-2-12  10:54-启动图片预览开源库V-Viewer
    //app.use(VueViewer);

    // 2024-2-13  14:37-引入地址选择器组件v-distpicker
    //app.component("v-distpicker", Distpicker);

    // 2024-8-11  15:21-全局安装IconPark图标
    install(app);

    // 2024-9-4  21:33-开发环境建议取消注册该钩子函数以尽可能的尽早暴露出错误来以进行错误处理
    // 2024-9-4  21:02-设置全局异常捕获钩子 , 该钩子将在组件渲染&观察期间出现错误但未能捕获时被调用(该钩子函数同样能捕获函数返回的Promise内部抛出的错误)
    // v2.2.0+ 该钩子可以捕获Vue生命周期钩子中抛出的错误
    // v2.4.0+ 该钩子可以捕获Vue自定义事件处理函数中抛出的错误
    // v2.6.0+ 该钩子可以捕获Vue的v-on DOM监听器内部抛出的错误
    app.config.errorHandler = function (error: Error) {

        console.error("发生错误 : ", error);
        ElMessage({
            message: `错误 : ${error.message}`,
            showClose: true,
            type: "error",
            center: true
        });

    };

    app.mount("#main-area");

}


const app: VueApp<Element> = createApp(App);

// noinspection JSIgnoredPromiseFromCall
configPlugins(app);
