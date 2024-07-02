<template>

  <div class="top-bar-container">

    <img
        class="logo-container"
        src="../../../assets/logo.svg"
        alt="PTP LOGO"
    />

    <span class="web-name-text-container">
      <a href="http://www.ptp.ink">PTP后台管理平台</a>
    </span>

    <div class="flex-grow-spacer"/>

    <span class="contact-us-container" @click="contactUsDialogVisible = true">与我们联系</span>


    <el-tooltip
        effect="dark"
        :content="isFullscreen?'退出全屏':'全屏'"
        placement="bottom"
    >
      <img v-if="!isFullscreen" @click="toggle" src="../../../assets/icons/fullscreen.svg" class="fullscreen-container"
           alt="Full Screen"/>
      <img v-else @click="toggle" src="../../../assets/icons/fullscreen-exit.svg" class="fullscreen-container"
           alt="Full Screen Exit"/>
    </el-tooltip>

    <el-tooltip
        effect="dark"
        content="语言切换"
        placement="bottom"
    >
      <el-dropdown trigger="click">
        <Icon icon="ooui:language" :width="24" :height="24" color="#000000"/>
        <template #dropdown>
          <el-dropdown-menu>
            <li v-for="locale in localeStore.availableLocales" :key="locale.id">
              <el-dropdown-item>{{ locale.name }}</el-dropdown-item>
            </li>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>

    <span class="welcome-text-container" ref="welcomeUserNameRef">{{
        userDataStore.localUserData == null ? "请登录" : `欢迎你，${userDataStore.localUserData.nickname}`
      }}</span>

    <el-dropdown @command="clickDropDownMenuItem">
      <el-avatar class="user-avatar-container" ref="avatarRef" :size="40" :src="avatarUrl"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="0">个人信息</el-dropdown-item>
          <el-dropdown-item :command="1">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <ContactUsDialog v-model="contactUsDialogVisible"/>

  </div>

</template>


<script lang="ts" setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/user";
import {NavigationType} from "@/enums/NavigationType";
import ContactUsDialog from "@/components/dialog/ContactUsDialog.vue";
import {useFullscreen} from "@vueuse/core";
import {Icon} from "@iconify/vue";
import {useLocaleStore} from "@/store/modules/locale";


const welcomeUserNameRef = ref(null);
const avatarRef = ref(null);


const contactUsDialogVisible = ref(false);
const avatarUrl = ref("src/assets/image/avatar_default.jpg");
const router = useRouter();
const userDataStore = UserDataStore();
const {isFullscreen, toggle} = useFullscreen();
const localeStore = useLocaleStore();


const emits = defineEmits(["hideComponent"]);


// 2024-2-7  16:18-登录登出回调函数
function clickDropDownMenuItem(command: number) {

  switch (command) {

    case 0:

      router.push({

        name: "profile",
        query: {

          type: NavigationType.PROFILE

        }

      });
      break;

    case 1:

      userDataStore.removeUserData();
      emits("hideComponent", () => {

        router.push({

          name: "login",
          query: {

            type: NavigationType.LOGOUT

          }

        });

      });
      break;

    default:

      break;

  }

}


/**
 *
 * @author
 * @date 2024/2/9 下午 6:40:24
 * @description 用于根据当前用户登录状态更新组件状态
 * @filename TopBar.vue
 *
 */
function updateComponentStatus() {

  console.log("开始更新顶栏组件状态");

  const userData = userDataStore.getUserData();

  // 2024-2-9  18:31-当进入该页面时，基本确定本地存在用户数据，因此可以立即填充用户相关的数据展示区域
  if (userData !== null) {

    console.log("更新顶栏组件状态为登录状态");
    welcomeUserNameRef.value.innerHTML = `欢迎你，${userData.nickname}`;
    avatarUrl.value = userData.avatar;

  }

}

defineExpose({

  updateComponentStatus

});


</script>


<style lang="scss" scoped>

.top-bar-container {

  display: flex;
  flex-direction: row;
  backdrop-filter: blur(50px);
  border-radius: 10px;
  align-items: center;


  .common-decor {

    margin: 5px 10px;
    color: black;

  }

  .logo-container {

    @extend .common-decor;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    user-select: none;
    pointer-events: none;

  }

  .web-name-text-container {

    margin: 5px 10px;
    background-image: linear-gradient(145deg, red, blue) !important;
    background-clip: text;
    cursor: default;

    & > * {

      font-weight: bolder;
      font-size: 1.5rem;
      user-select: none;

    }

  }


  .flex-grow-spacer {

    @extend .common-decor;
    flex-grow: 1;

  }

  .contact-us-container {

    @extend .common-decor;

  }

  .fullscreen-container {

    @extend .common-decor;
    width: 25px;
    height: 25px;

  }

  .welcome-text-container {

    @extend .common-decor;

  }

  .user-avatar-container {

    @extend .common-decor;

  }

}

</style>
