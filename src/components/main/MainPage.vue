<template>

    <div class="main">

        <transition name="el-zoom-in-top">
            <TopBar v-show="isShowTopBar" ref="topBarRef" @hideComponent="hideComponent"/>
        </transition>
        <el-container class="major-content">

            <transition name="el-zoom-in-bottom">
                <SideBar v-show="isShowSideBar" class="main-sideBar"/>
            </transition>
            <router-view class="contentShowContainer">
            </router-view>

        </el-container>

    </div>

</template>


<script lang="ts" setup>

import SideBar from "@/components/main/SideBar.vue";
import TopBar from "@/components/main/TopBar.vue";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/user";
import Administrator from "@/dao/Administrator";


const topBarRef = ref(null);


const isShowTopBar = ref(false);
const isShowSideBar = ref(false);
const router = useRouter();
const userDataStore = UserDataStore();
const localUserData = ref(null as Administrator);


new Promise(resolve => {

    setTimeout(() => {

        isShowTopBar.value = true;
        resolve();

    }, 2000);

}).then(() => {

    setTimeout(() => {

        isShowSideBar.value = true;

        // 2024-2-10  17:19-自动导航至空页面
        router.push({

            name: "empty"

        });


    }, 800);

}).catch(err => {

    ElMessage.error("页面渲染错误");
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

        message: "正在登出...",
        showClose: true,
        type: "warning",
        center: true

    });
    new Promise(resolve => {


        setTimeout(() => {

            isShowSideBar.value = false;
            resolve();

        }, 2000);

    }).then(() => {

        setTimeout(() => {

            isShowTopBar.value = false;
            action();

        }, 800);

    }).catch(err => {

        ElMessage.error("页面渲染错误");
        console.log(err);

    });

}


</script>

<style lang="scss" scoped>

.main {

  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url("/src/assets/image/login_background.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-clip: border-box;
  background-size: cover;

  > .main-sideBar {

    width: 200px;

  }

  > .major-content {

    flex: 1;
    display: flex;

    > .contentShowContainer {

      width: 100%;
      height: 100%;

    }

  }

}

</style>
