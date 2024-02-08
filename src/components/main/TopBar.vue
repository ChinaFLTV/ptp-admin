<template>

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
        <el-menu-item class="topBar-tab-text" @click="contactUs" index="1">与我们联系</el-menu-item>
        <el-menu-item @click="loginOrLogout">
            <el-avatar :size="40" :src="avatar_default"/>
        </el-menu-item>

    </el-menu>


  <!--  2024-1-16  22:33-不可见组件  -->
    <el-dialog v-model="contactUsDialogVisible" title="联系我们" draggable center>

        <div class="dialog_content_contactUs">

            <el-text type="primary">欢迎添加达哥QQ，与达哥一起探索编程世界！</el-text>
            <el-image style="width:300px" :src="qq_qrcode" alt="达哥QQ二维码"/>

        </div>

    </el-dialog>

</template>


<script lang="ts" setup>

import avatar_default from "@/assets/image/avatar_default.jpg";
import qq_qrcode from "@/assets/image/qq_qrcode.jpg";

import {ref} from "vue";
import {useRouter} from "vue-router";
import {LogType} from "@/enums/LogType";

const contactUsDialogVisible = ref(false);

const router = useRouter();

const contactUs = () => {

    contactUsDialogVisible.value = true;

};


// 2024-2-7  16:18-登录登出回调函数
function loginOrLogout() {

    console.log("点击了头像按钮");
    router.push({

        name: "login",
        params: {

            type: LogType.LOGIN

        }

    });

}

</script>


<style>

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
