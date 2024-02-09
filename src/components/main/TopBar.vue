<template>

    <div>

        <el-menu
                mode="horizontal"
                :ellipsis="false" background-color="#0D2266" text-color="#ffffff">

            <el-menu-item index="0" disabled>
                <img
                        class="logo"
                        src="../../assets/logo.svg"
                        alt="PTP LOGO"
                        style="width: 60px"
                />
            </el-menu-item>
            <div class="flex-grow"/>
            <el-menu-item class="topBar-tab-text" @click="contactUsDialogVisible = true" index="1">与我们联系
            </el-menu-item>
            <el-menu-item>
                <span ref="welcomeUserNameRef">请登录</span>
            </el-menu-item>
            <el-menu-item>
                <el-dropdown @command="clickDropDownMenuItem">
                    <el-avatar ref="avatarRef" :size="40" :src="avatarUrl"/>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :command="0">个人信息</el-dropdown-item>
                            <el-dropdown-item :command="1">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-menu-item>

        </el-menu>


        <!--  2024-1-16  22:33-不可见组件  -->
        <el-dialog v-model="contactUsDialogVisible" title="联系我们" draggable center>

            <div class="dialog_content_contactUs">

                <el-text type="primary">欢迎添加达哥QQ，与达哥一起探索编程世界！</el-text>
                <el-image style="width:300px" :src="qq_qrcode" alt="达哥QQ二维码"/>

            </div>

        </el-dialog>

    </div>

</template>


<script lang="ts" setup>

import qq_qrcode from "@/assets/image/qq_qrcode.jpg";

import {ref} from "vue";
import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/user";


const welcomeUserNameRef = ref(null);
const avatarRef = ref(null);


const contactUsDialogVisible = ref(false);
const avatarUrl = ref("src/assets/image/avatar_default.jpg");
const router = useRouter();
const userDataStore = UserDataStore();


// 2024-2-7  16:18-登录登出回调函数
function clickDropDownMenuItem(command: number) {

    switch (command) {

        case 0:

            router.push({

                name: "profile"

            });
            break;

        case 1:

            userDataStore.removeUserData();
            router.push({

                name: "login"

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
        welcomeUserNameRef.value.innerHTML = `欢迎你，${userData.nickname}！`;
        avatarUrl.value = userData.avatar;

    }

}

defineExpose({

    updateComponentStatus

});


</script>


<style lang="scss" scoped>

.topBar-tab-text {

  font-weight: bolder;

}

.flex-grow {

  flex-grow: 1;

}

.dialog_content_contactUs {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

</style>
