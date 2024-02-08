<template>


    <el-menu :active-text-color="primaryColor" default-active="1">

        <el-menu-item index="1" :active-text-color="primaryColor">
            <el-icon>
                <Histogram/>
            </el-icon>
            <span class="menuItem">仪表盘</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="2" :active-text-color="primaryColor">
            <el-icon>
                <DataAnalysis/>
            </el-icon>
            <span class="menuItem">数据管理</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="3" :active-text-color="primaryColor">
            <el-icon>
                <UserFilled/>
            </el-icon>
            <span class="menuItem">人员管理</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="4" :active-text-color="primaryColor">
            <el-icon>
                <SetUp/>
            </el-icon>
            <span class="menuItem">版本控制</span>
        </el-menu-item>

    </el-menu>

</template>


<script lang="ts" setup>

// 2024-2-6  22:29-主色调颜色
import {DataAnalysis, Histogram, SetUp, UserFilled} from "@element-plus/icons-vue";

const primaryColor = "#ff0000";


</script>


<style lang="scss" scoped>

@import "../../../public/css/global";

.menuItem {

  font-weight: bolder;
  font-size: 1.1rem;
  text-align: center;
  color: $primaryColor;

}

.subMenuItem {

  font-weight: normal;
  font-size: 0.8rem;
  color: $primaryColor;

}


</style>
