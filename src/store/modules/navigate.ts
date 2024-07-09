import {defineStore} from "pinia";
import randomUUID from "@/utils/uuid";
import {Page} from "@/model/view/page";
import {Ref} from "vue";

export const NavigateStore = defineStore("navigateStore", {

    state: () => {

        const openedPages: Ref<Array<Page>> = ref([{

            titlePlaceholder: "仪表盘",
            titleKey: "common.bar.side.dashboard",
            name: "dashboard",
            path: "dashboard",
            id: randomUUID(),
            draggable: true,
            closeable: false,
            cached: true

        } as Page]);
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

            const index = this.openedPages.findIndex((page: Page) => page.id === id);
            this.openedPages.splice(index, 1);
            return index;

        }


    }

});
