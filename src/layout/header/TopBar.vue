<template>

  <div class="top-bar-container">

    <img
        class="logo-container"
        src="../../assets/logo.svg"
        alt="PTP LOGO"
        @click="jumpToUrl(PTP_WEB_SITE_URL)"
    />

    <wave-view class="website-title-container" :multiple="10">
      <span class="web-name-text-container">
        <span>{{ $t("common.bar.top.appTitle") }}</span>
      </span>
    </wave-view>

    <span class="top-bar-item-container" @click="jumpChatRoomPage">
      <wechat class="top-bar-item-icon-container" theme="multi-color" size="24"
              :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span class="top-bar-item-text-container">{{ $t("common.bar.top.chatRoom") }}</span>
    </span>
    <span class="top-bar-item-container" @click="jumpBrowserPage">
      <book-one class="top-bar-item-icon-container" theme="multi-color" size="20"
                :fill="['#000' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span class="top-bar-item-text-container">{{ $t("common.bar.top.myBlog") }}</span>
    </span>
    <span class="top-bar-item-container" @click="jumpGamePage">
      <game-three class="top-bar-item-icon-container" theme="multi-color" size="20"
                  :fill="['#000' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
      <span class="top-bar-item-text-container">{{ $t("common.bar.top.entertainment") }}</span>
    </span>

    <div class="flex-grow-spacer"/>

    <span class="contact-us-container"
          @click="contactUsDialogVisible = true">{{ $t("common.bar.top.contactUs") }}</span>


    <el-tooltip
        effect="dark"
        :auto-close="1000"
        :content="isFullscreen?$t('common.bar.top.exitFullscreen'):$t('common.bar.top.enterFullscreen')"
        placement="bottom"
    >
      <img v-if="!isFullscreen" @click="toggle" src="../../assets/icons/fullscreen.svg" class="fullscreen-container"
           :alt="$t('common.bar.top.enterFullscreen')"/>
      <img v-else @click="toggle" src="../../assets/icons/fullscreen-exit.svg" class="fullscreen-container"
           :alt="$t('common.bar.top.exitFullscreen')"/>
    </el-tooltip>

    <el-tooltip
        effect="dark"
        :auto-close="1000"
        :content="$t('common.bar.top.changeLanguage')"
        placement="bottom"
    >
      <el-dropdown trigger="click" @command="changeLanguage">
        <Icon icon="ooui:language" :width="24" :height="24" color="#000000"/>
        <template #dropdown>
          <el-dropdown-menu>
            <li v-for="locale in localeStore.availableLocales" :key="locale.id">
              <el-dropdown-item :command="locale"
                                :style="{color:(localeStore.currentLocaleId===locale.id)?'#409eff':'#606266'}">
                {{ locale.name }}
              </el-dropdown-item>
            </li>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>

    <span class="welcome-text-container" ref="welcomeUserNameRef">{{

        //// 2024-7-4  16:36-先临时采用字符串拼接的形式完成欢迎标语的国际化(不知道咋了,字符串格式化就是总是出问题)
        userDataStore.localUserData == null ? $t("common.bar.top.enterLogin") : $t("common.bar.top.welcome", {nickname: userDataStore.localUserData.nickname})

      }}</span>

    <el-dropdown @command="clickDropDownMenuItem">
      <el-avatar class="user-avatar-container" ref="avatarRef" :size="40" :src="avatarUrl"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="0">{{ $t("common.bar.top.profile") }}</el-dropdown-item>
          <el-dropdown-item :command="1">{{ $t("common.bar.top.exitLogin") }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <ContactUsDialog v-model="contactUsDialogVisible"/>

  </div>

</template>


<script lang="ts" setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/modules/user";
import {NavigationType} from "@/enums/NavigationType";
import ContactUsDialog from "@/components/dialog/ContactUsDialog.vue";
import {useFullscreen} from "@vueuse/core";
import {Icon} from "@iconify/vue";
import {Locale, useLocaleStore} from "@/store/modules/locale";
import {useLocale} from "@/hooks/web/useLocale";
import {i18n} from "@/plugins/vueI18n";
import WaveView from "@/components/animation/WaveView.vue";
import {PTP_WEB_SITE_URL} from "@/constants/web";
import {LoginClientType} from "@/enums/LoginClientType";
import {logout} from "@/api/content/user/login";
import {BookOne, GameThree, Wechat} from "@icon-park/vue-next";

const welcomeUserNameRef = ref(null);
const avatarRef = ref(null);


const contactUsDialogVisible = ref(false);
const avatarUrl = ref("src/assets/image/avatar_default.jpg");
const router = useRouter();
const userDataStore = UserDataStore();
const {isFullscreen, toggle} = useFullscreen();
const localeStore = useLocaleStore();


const emits = defineEmits(["hideComponent"]);
const {changeLocale} = useLocale();

const {t} = i18n.global;


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/11 PM 4:17:11
 * @filename TopBar.vue
 * @description 跳转至聊天室页面
 *
 */
function jumpChatRoomPage() {

  router.push({

    name: "chat-room"

  });

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/29 PM 8:55:49
 * @filename TopBar.vue
 * @description 跳转至浏览器页面
 *
 */
function jumpBrowserPage() {

  router.push({

    name: "browse",
    state: {

      params: {

        url: "https://www.yuque.com/jujingyi-mzjzr"

      }

    }

  });

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/30 PM 10:10:06
 * @filename TopBar.vue
 * @description 跳转到游戏界面
 *
 */
function jumpGamePage() {

  router.push({

    name: "entertainment"

  });

}


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

      // 2024-8-7  16:4-通知云端和本地清理用户数据信息
      logout(LoginClientType.WEB, userDataStore.localUserData.id);

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
    // @ts-ignore
    welcomeUserNameRef.value.innerHTML = t("common.bar.top.welcome", {nickname: userDataStore.localUserData.nickname});
    avatarUrl.value = JSON.parse(userData?.avatar).uri;

  }

}


/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 8:11:25
 * @filename TopBar.vue
 * @param newLocale 新更换的区域语言设置
 * @description 更改应用语言
 *
 */
function changeLanguage(newLocale: Locale) {

  // 2024-7-3  20:13-如果切换前后的语言一致 , 则不做任何处理
  if (localeStore.currentLocaleId == newLocale.id)
    return;

  changeLocale(newLocale.id);

  // 需要重新加载页面让整个语言多初始化
  window.location.reload();

}


/**
 *
 * @author Lenovo
 * @date 2024/7/11 PM 10:53:33
 * @filename TopBar.vue
 * @param url {string} 指定的网页链接
 * @description 跳转到指定URL的页面处
 *
 */
function jumpToUrl(url: string) {

  window.location.href = url;

}


defineExpose({

  updateComponentStatus

});


</script>


<style lang="scss" scoped>


@import "topbar.module";


</style>
