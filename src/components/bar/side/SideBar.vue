<template>

  <div class="side-bar-container">

    <div v-adjustFontSize="180"
         :class="{'active-side-bar-container':sideBarItem.name==navigateStore.currentOpenedPage.name}"
         class="side-bar-item-container"
         v-for="sideBarItem in sideBarItems"
         :key="sideBarItem.name"
         @click="clickSideTab(sideBarItem.title,sideBarItem.name,NavigationType.TAB_EXCHANGE)">

      {{ sideBarItem.title }}

    </div>

  </div>

</template>


<script lang="ts" setup>

// 2024-2-6  22:29-主色调颜色
import {useRouter} from "vue-router";
import {NavigationType} from "@/enums/NavigationType";
import {NavigateStore} from "@/store/modules/navigate";
import randomUUID from "@/utils/uuid";
import {ElMessage} from "element-plus";
import {SideBarItem} from "@/model/view/SideBarItem";
import {Ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const router = useRouter();
const navigateStore = NavigateStore();
const sideBarItems: Ref<Array<SideBarItem>> = ref([

  {

    title: t("common.bar.side.dashboard"),
    name: "dashboard",
    icon: "Histogram"

  },
  {

    title: t("common.bar.side.contentManage"),
    name: "contentManage",
    icon: "DataAnalysis"

  },
  {

    title: t("common.bar.side.userManage"),
    name: "userManage",
    icon: "UserFilled"

  },
  {

    title: t("common.bar.side.versionControl"),
    name: "versionControl",
    icon: "SetUp"

  }

]);

/**
 *
 * @author Lenovo
 * @date 2024/2/16 下午 4:54:20
 * @filename SideBar.vue
 * @description 用于处理侧边栏的点击事件
 * @param {string} title 侧边栏选项卡的标题
 * @param {string} name 侧边栏选项卡的导航目的地name
 * @param {NavigationType} type 侧边栏选项卡的导航类型
 *
 */
function clickSideTab(title: string, name: string, type: NavigationType) {

  router.push({

    name,
    query: {

      type

    }

  }).catch(failure => {

    if (failure) {

      ElMessage.error("导航失败：" + failure);
      console.error(failure);

    }

  }).then(_ => {

    const page = {

      title,
      name,
      path: `/main/content/${name.toLowerCase()}`,
      id: randomUUID(),
      openTime: new Date(),
      draggable: true,
      closeable: true,
      cached: true

    };

    if (navigateStore.openedPages.filter(p => p.path == page.path).length > 0) {

      // 2024-4-18  20:35-说明已经打开过相同标签，此时直接跳回已打开的相同标签
      const index = navigateStore.openedPages.findIndex(p => p.path == page.path);
      navigateStore.currentOpenedPage = navigateStore.openedPages[index];

    } else {

      navigateStore.openedPages.push(page);
      navigateStore.currentOpenedPage = page;

    }

  });

}


</script>


<style lang="scss" scoped>


.side-bar-container {

  height: 100%;

  .side-bar-item-container {

    margin: 10px 10px;
    border-radius: 10px;
    background-color: antiquewhite;
    height: 60px;
    text-align: center;
    line-height: 60px;
    letter-spacing: 5px;
    opacity: 0.7;
    color: black;

  }

  .active-side-bar-container {

    font-weight: bolder;
    background-color: #0D2266 !important; // 2024-4-18  20:18-添加!important以解决当前Tab处于选中状态时依旧响应hover样式从而使背景颜色改变
    opacity: 1;
    color: whitesmoke;

  }

}


</style>
