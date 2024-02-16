<template>


    <el-menu :active-text-color="primaryColor" default-active="1">

        <el-menu-item index="1" :active-text-color="primaryColor"
                      @click="clickSideTab('仪表盘','dashboard',NavigationType.DASHBOARD)">
            <el-icon>
                <Histogram/>
            </el-icon>
            <span class="menuItem">仪表盘</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="2" :active-text-color="primaryColor"
                      @click="clickSideTab('数据管理','dataManage',NavigationType.DATA_MANAGE)">
            <el-icon>
                <DataAnalysis/>
            </el-icon>
            <span class="menuItem">数据管理</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="3" :active-text-color="primaryColor"
                      @click="clickSideTab('人员管理','userManage',NavigationType.USER_MANAGE)">
            <el-icon>
                <UserFilled/>
            </el-icon>
            <span class="menuItem">人员管理</span>
        </el-menu-item>
        <el-menu-item class="menuItem" index="4" :active-text-color="primaryColor"
                      @click="clickSideTab('版本控制','versionControl',NavigationType.VERSION_CONTROL)">
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
import {useRouter} from "vue-router";
import {NavigationType} from "@/enums/NavigationType";
import {NavigateStore} from "@/store/navigate";
import randomUUID from "@/utils/uuid";
import {ElMessage} from "element-plus";

const primaryColor = "#ff0000";
const router = useRouter();
const navigateStore = NavigateStore();

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

    console.log("点击侧边栏选项卡");
    router.push({

        name,
        query: {

            type

        }

    }).catch(failure => {

        if (failure) {

            ElMessage.error("导航失败：" + failure);
            console.error(failure);

        } else {

            const page = {

                title,
                name,
                path: `/main/content/${name.toLowerCase()}`,
                id: randomUUID(),
                draggable: true,
                closeable: true,
                cached: true

            };
            navigateStore.openedPages.push(page);
            navigateStore.currentOpenedPage = page;

        }

    });

}


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
