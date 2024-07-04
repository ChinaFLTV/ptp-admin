<template>

  <div class="appContainer">
    <router-view></router-view>
  </div>

</template>


<script setup lang="ts">

import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/modules/user";
import LwFireworks from "lw_firewords";

const router = useRouter();
const userDataStore = UserDataStore();

// 2024-4-19  11:07-重新放置烟花初始化代码于此处,避免直接登入后烟花效果消失的BUG
// 2024-2-8  15:02-初始化鼠标点击出现烟花的效果的开源库
const lw_f = new LwFireworks();//创建实例
lw_f.init();//启动事件

if (userDataStore.getUserData() !== null) {

  router.push({

    name: "main"

  });

} else {

  router.push({

    name: "login"

  });

}

</script>


<style scoped lang="scss">

.appContainer {

  height: 100vh;
  background-color: antiquewhite;

}

</style>
