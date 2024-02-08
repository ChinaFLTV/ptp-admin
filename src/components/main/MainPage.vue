<template>

    <div class="main">

        <TopBar/>
        <el-container class="major-content">

            <SideBar class="main-sideBar"/>
            <router-view>
            </router-view>

        </el-container>

    </div>

</template>


<script lang="ts" setup>

import SideBar from "@/components/main/SideBar.vue";
import TopBar from "@/components/main/TopBar.vue";
</script>

<style lang="scss" scoped>

.main {

  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: mediumvioletred;

  .main-sideBar {

    width: 200px;


  }

}

.major-content {

  background: #96c5ff;
  flex: 1;
  display: flex;

}

</style>
