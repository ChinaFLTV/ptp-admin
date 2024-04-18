import {defineStore} from "pinia";
import randomUUID from "@/utils/uuid";
import {Page} from "@/entity/page";
import {Ref} from "vue";

export const NavigateStore = defineStore("navigateStore", {

    state: () => {

        const openedPages: Ref<Array<Page>> = ref([{

            title: "仪表盘",
            name: "dashboard",
            path: "dashboard",
            id: randomUUID(),
            draggable: true,
            closeable: false,
            cached: true

        }]);
        const currentOpenedPage = ref(openedPages.value[0]);

        return {openedPages, currentOpenedPage};

    },
    getters: {},
    actions: {

        /**
         *
         * @author Lenovo
         * @date 2024/2/16 下午 4:31:47
         * @filename navigate.ts
         * @description 移除指定ID对应的页面
         * @param {number} id 页面ID
         *
         */
        removePage(id: number): number {

            const index = this.openedPages.findIndex(page => page.id === id);
            this.openedPages.splice(index, 1);
            return index;

        }


    }

});
