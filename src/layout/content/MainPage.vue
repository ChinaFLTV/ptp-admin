<template>

  <div class="main-container">

    <transition name="el-zoom-in-top">
      <TopBar class="main-top-bar-container" v-show="isShowTopBar" ref="topBarRef" @hideComponent="hideComponent"/>
    </transition>
    <el-container class="major-content-container">

      <transition name="el-zoom-in-bottom">
        <SideBar v-show="isShowSideBar" class="main-side-bar-container"/>
      </transition>

      <div class="main-content-container">

        <transition name="el-zoom-in-top">
          <PageTabs class="main-page-tabs-container" v-show="isShowPageTabs"/>
        </transition>
        <router-view class="main-content-show-container"></router-view>

      </div>

    </el-container>

  </div>

</template>


<script lang="ts" setup>

import SideBar from "@/components/bar/side/SideBar.vue";
import TopBar from "@/components/bar/top/TopBar.vue";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/modules/user";
import Administrator from "@/model/Administrator";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const topBarRef = ref(null);


const isShowTopBar = ref(false);
const isShowSideBar = ref(false);
const isShowPageTabs = ref(false);
const router = useRouter();
const userDataStore = UserDataStore();
const localUserData = ref(null as Administrator);


new Promise(resolve => {

  setTimeout(() => {

    isShowTopBar.value = true;
    resolve(0);

  }, 2000);

}).then(() => {

  setTimeout(() => {

    isShowSideBar.value = true;

  }, 800);

}).then(() => {

  setTimeout(() => {

    isShowPageTabs.value = true;

  }, 1500);

}).then(() => {

  setTimeout(() => {

    // 2024-2-16  12:33-自动导航至数据看板页面
    // 2024-2-10  17:19-自动导航至空页面
    router.push({

      name: "dashboard"

    });

  }, 500);

}).catch(err => {

  ElMessage.error(t("common.message.pageRenderError"));
  console.log(err);

});


onMounted(() => {

  // 2024-2-9  22:48-当显示此页面时，说明此时用户一定已经登录了，于是需要更新顶栏组件状态
  topBarRef.value.updateComponentStatus();
  localUserData.value = userDataStore.getUserData() as Administrator;

});


/**
 *
 * @author LiGuanda
 * @param {()=>any} action 最后的回调函数
 * @date 2024/2/10 下午 3:42:55
 * @filename MainPage.vue
 * @description 用于隐藏本区域的主要组件
 *
 */
function hideComponent(action: () => any) {

  ElMessage({

    message: t("common.message.logout"),
    showClose: true,
    type: "warning",
    center: true

  });
  new Promise(resolve => {


    setTimeout(() => {

      isShowSideBar.value = false;
      resolve(0);

    }, 2000);

  }).then(() => {

    setTimeout(() => {

      isShowTopBar.value = false;

    }, 800);

  }).then(() => {

    setTimeout(() => {

      isShowPageTabs.value = false;
      action();

    }, 1000);

  }).catch(err => {

    ElMessage.error("页面渲染错误");
    console.log(err);

  });

}


</script>

<style lang="scss" scoped>

$topBar_height: 60px;
$sideBar_width: 200px;
$sideBar_height: calc(100vh - 10px - $topBar_height - 2 * 10px);
$pageTabs_height: 60px;
$content_height: calc(100vh - 10px - $topBar_height - 10px - $pageTabs_height - 10px - 10px);

.main-container {

  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url("/src/assets/image/login_background.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-clip: border-box;
  background-size: cover;

  .main-top-bar-container {

    height: $topBar_height;
    margin: 10px 10px 5px 10px;
    border-radius: 10px;

  }

  .major-content-container {

    width: 100%;
    display: flex;

    .main-side-bar-container {

      width: $sideBar_width;
      height: $sideBar_height;
      border-radius: 10px;
      backdrop-filter: blur(50px);
      margin: 5px 5px 10px 10px;

    }

    .main-content-container {

      width: calc(100vw - $sideBar_width - 10px - 10px - 10px);
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: start;

      .main-page-tabs-container {

        width: 100%;
        height: $pageTabs_height;
        backdrop-filter: blur(50px);
        margin: 5px 10px 5px 5px;
        border-radius: 10px;

      }

      .main-content-show-container {

        width: 100%;
        max-height: $content_height;
        border-radius: 10px;
        flex-grow: 1;
        margin: 5px 10px 10px 5px;
        box-sizing: border-box;
        overflow: auto;

      }

    }

  }

}

</style>
