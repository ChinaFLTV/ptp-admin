/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 11:18:23
 * @filename index.ts
 * @description 配置APP的全局数据存储与通信插件
 *
 */

import {createPinia, Pinia} from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import type { App } from 'vue'

const pinia: Pinia = createPinia();

pinia.use(piniaPluginPersistedState);

function setupStore(app: App<Element>) {

    app.use(pinia);

}


export {

    pinia,
    setupStore

};
