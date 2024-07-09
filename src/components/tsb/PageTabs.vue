<template>

  <el-scrollbar class="pageTabsContainer">

    <div style="display:flex;max-width: 100%;margin-left: 1rem;align-items: center;">

             <span @click="clickPageTab(page)" class="tab"
                   :class="{activeTab:page.id===navigateStore.currentOpenedPage.id}"
                   v-for="page in navigateStore.openedPages" :key="page.id">

                <span style="display: inline-flex;justify-content: center;align-items: center;flex-wrap: wrap;">

                    <span class="title"
                          :style="{color:(page.id===navigateStore.currentOpenedPage.id?'white':'#606266')}">{{
                        page.titleKey ? $t(page.titleKey) : page.titlePlaceholder
                      }}</span>

                    <el-icon v-show="page.id===navigateStore.currentOpenedPage.id"
                             :style="{color:(page.id===navigateStore.currentOpenedPage.id?'white':'dimgray'),marginLeft:'1rem',marginRight:'0.5rem'}"><Operation/></el-icon>

                   <el-icon v-if="page.closeable"><Close
                       @click.stop="closeTab(page)"
                       :style="{color: (page.id===navigateStore.currentOpenedPage.id?'white':'dimgray')}"/>
                    </el-icon>

                    <span v-if="page.cached" class="cache"></span>

                </span>

            </span>

    </div>

  </el-scrollbar>

</template>


<script setup lang="ts">

import {Close, Operation} from "@element-plus/icons-vue";
import {NavigateStore} from "@/store/modules/navigate";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {NavigationType} from "@/enums/NavigationType";
import {Page} from "@/model/view/page";


const navigateStore = NavigateStore();
const router = useRouter();


/**
 *
 * @author LiGuanda
 * @date 2024/2/14 下午 1:05:25
 * @filename PageTabs.vue
 * @description 用于作为用户点击页面选项卡的回调事件
 *
 */
function clickPageTab(page: Page) {

  const oldCurrentOpenedPage = navigateStore.currentOpenedPage;

  try {

    router.push({

      name: page.name,
      query: {

        type: NavigationType.TAB_EXCHANGE

      }

    })?.then(failure => {

      if (failure) {

        console.log(failure);
        ElMessage({

          message: "重复点击",
          showClose: true,
          type: "warning",
          center: true

        });

      } else {

        navigateStore.currentOpenedPage = page;

      }

    });

  } catch (err) {

    console.log(err);
    ElMessage.error("页面渲染错误");
    navigateStore.currentOpenedPage = oldCurrentOpenedPage;

  }

}


/**
 *
 * @author Lenovo
 * @date 2024/2/16 下午 4:26:52
 * @filename PageTabs.vue
 * @description 关闭页面选项卡
 *
 */
function closeTab(page: Page) {

  const index = navigateStore.removePage(page.id);

  // 2024-2-16  16:45-只有当前页面为待关闭页面时，才去主动加载其他页面，否则其他保持不变
  if (page.id === navigateStore.currentOpenedPage.id) {

    const newPage = navigateStore.openedPages[index - 1];

    router.push({

      name: newPage?.name,
      query: {

        type: NavigationType.TAB_CLOSE

      }

    }).then(failure => {

      if (failure) {

        ElMessage.error("页面渲染错误");
        console.error(failure);

      } else {

        navigateStore.currentOpenedPage = newPage;

      }

    });

  }

}


</script>


<style scoped lang="scss">

@import "../../style/system";

.pageTabsContainer {

  display: flex;
  align-items: center;

  .tab {

    display: inline-block;
    text-align: center;
    padding: 0 1rem 0 1rem;
    height: 38px;
    margin-right: 2rem;
    margin-top: 8px;
    margin-bottom: 6px;
    line-height: 38px;
    border-radius: 5px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;

    .title {

      user-select: none;
      letter-spacing: 0.1rem;
      font-weight: bolder;

    }

    &:hover {

      background-color: #5240ff30;
      color: #5240ff;

    }

    .cache {

      display: block;
      min-width: 15px;
      max-width: 60px;
      border-radius: 999px;
      background-color: #ff0000;
      height: 3px;
      flex-basis: 100%;

    }

  }

  .activeTab {

    font-weight: bolder;
    background-color: #0D2266 !important; // 2024-4-18  18:51-添加!important以解决当前Tab处于选中状态时依旧响应hover样式从而使背景颜色改变

  }

  :deep(.el-scrollbar__thumb) {

    @extend .scrollBar;

  }

}

</style>
