<template>

  <div class="main-container">

    <transition name="el-zoom-in-top">
      <TopBar class="main-top-bar-container" v-show="isShowTopBar" ref="topBarRef" @hideComponent="hideComponent"/>
    </transition>

    <el-container class="main-content-container">
      <router-view v-slot="{Component}">

        <transition name="el-zoom-in-center" v-show="isShowContentArea">
          <!--  2024-8-9  1803-解决 <router-view> can no longer be used directly inside <transition> or <keep-alive> 的问题(https://router.vuejs.org/zh/guide/advanced/transitions.html)  -->
          <component :is="Component"/>
        </transition>

      </router-view>
    </el-container>

  </div>

</template>


<script lang="ts" setup>

import TopBar from "@/layout/header/TopBar.vue";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";
import {UserDataStore} from "@/store/modules/user";
import {useI18n} from "vue-i18n";
import {User} from "@/model/po/manage/User";

const {t} = useI18n();

const topBarRef = ref(null);


const isShowTopBar = ref(false);
const isShowContentArea = ref(false);

const userDataStore = UserDataStore();
const localUserData = ref(null as User);


onMounted(() => {

  showComponent();

  // 2024-2-9  22:48-当显示此页面时，说明此时用户一定已经登录了，于是需要更新顶栏组件状态
  topBarRef.value.updateComponentStatus();
  localUserData.value = userDataStore.getUserData() as User;

});


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/9 PM 5:32:49
 * @filename MainLayout.vue
 * @description 用于显示本区域的主要组件
 *
 */
function showComponent() {

  setTimeout(() => {

    isShowTopBar.value = true;

    setTimeout(() => {

      isShowContentArea.value = true;

    }, 800);

  }, 2000);

}


/**
 *
 * @author LiGuanda
 * @param {()=>any} action 最后的回调函数
 * @date 2024/2/10 下午 3:42:55
 * @filename MainLayout.vue
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

  setTimeout(() => {

    isShowContentArea.value = false;

    setTimeout(() => {

      isShowTopBar.value = false;
      // 2024-8-9  18:02-只有传入了有效的action才去执行action回调
      action && action();

    }, 800);

  }, 800);

}


</script>

<style lang="scss" scoped>

$topBar_height: 60px;
$content_height: calc(100vh - 10px - $topBar_height - 10px - 10px);

.main-container {

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

  .main-content-container {

    display: grid;
    place-items: center;
    max-height: $content_height;
    border-radius: 10px;
    margin: 5px 10px 10px 10px;
    box-sizing: border-box;
    overflow: auto;

  }

}

</style>
