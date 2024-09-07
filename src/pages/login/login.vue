<template>

  <div class="loginContainer">

    <transition name="el-zoom-in-center">
      <div v-show="isShowLoginBox" class="formContainer">

        <transition name="el-fade-in-linear">
          <h3 v-show="isShowLoginForm" class="loginTitle">LOGIN</h3>
        </transition>
        <transition name="el-zoom-in-bottom">
          <el-input v-show="isShowLoginForm" class="inputContainer" :disabled="!isOperateForm"
                    :placeholder="$t('login.nicknamePlaceholder')"
                    input-style="{background-color:transparent;color:antiquewhite;}"
                    v-model="loginData.nickname" clearable/>
        </transition>
        <transition name="el-zoom-in-bottom">
          <el-input v-show="isShowLoginForm" class="inputContainer" :disabled="!isOperateForm"
                    :placeholder="$t('login.passwordPlaceholder')"
                    input-style="{background-color:transparent;color:antiquewhite;}"
                    :show-password="true" v-model="loginData.password" clearable/>
        </transition>
        <transition name="el-zoom-in-bottom">
          <el-button :loading="isLoggingIn" :disabled="!isOperateForm" class="loginButton"
                     v-show="isShowLoginForm" type="primary"
                     @click="login">{{ $t("login.loginTitle") }}
          </el-button>
        </transition>

      </div>
    </transition>

  </div>

</template>


<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">


import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/modules/user";
import {NavigationType} from "@/enums/NavigationType";
import {useI18n} from "vue-i18n";
import {loginByNicknameAndPassword} from "@/api/content/user/login";

const {t} = useI18n();

// 2024-2-8  15:10-是否显示登录对话框
const isShowLoginBox = ref(false);
// 2024-2-8  15:13-是否显示登录表单组件
const isShowLoginForm = ref(false);
// 2024-2-8  19:26-标记用户当前是否处于正在登录状态
const isLoggingIn = ref(false);
// 2024-2-8  19:27-标记当前用户是否可对表单组件进行操作
const isOperateForm = ref(true);

const router = useRouter();
const userDataStore = UserDataStore();


const loginData = ref({

  nickname: "",
  password: ""

});


new Promise((resolve) => {

  setTimeout(() => {

    isShowLoginBox.value = true;
    resolve(null);

  }, 2000);

}).then(() => {

  setTimeout(() => {

    isShowLoginForm.value = true;

  }, 800);

}).catch(err => {

  ElMessage.error(t("common.message.pageRenderError"));
  console.log(err);

});

function login() {

  isLoggingIn.value = true;

  if (loginData.value.nickname.toString().trim() === "" || loginData.value.password.toString().trim() === "") {

    ElMessage({

      message: t("common.message.incompleteInformation"),
      showClose: true,
      type: "error",
      center: true

    });
    isLoggingIn.value = false;
    isOperateForm.value = true;
    return;

  }


  loginByNicknameAndPassword(loginData.value.nickname, loginData.value.password).then(response => {

    // response = response.data;
    // @ts-ignore
    if (!response) {

      ElMessage({

        message: t("login.message.loginError"),
        showClose: true,
        type: "error",
        center: true

      });
      isLoggingIn.value = false;
      isOperateForm.value = true;
      return;

    } else if (response.data === null) {

      ElMessage({

        message: t("login.message.incorrectInformation"),
        showClose: true,
        type: "error",
        center: true

      });
      isLoggingIn.value = false;
      isOperateForm.value = true;
      return;

    }

    ElMessage({

      message: t("login.message.checkPass"),
      showClose: true,
      type: "success",
      center: true

    });
    isLoggingIn.value = false;
    isOperateForm.value = false;
    new Promise(resolve => {

      setTimeout(() => {

        isShowLoginForm.value = false;
        resolve(null);

      }, 500);

    }).then(() => {

      setTimeout(() => {

        isShowLoginBox.value = false;
        router.push({

          name: "main",
          query: {

            type: NavigationType.LOGIN

          }

        });

      }, 200);

    }).catch(err => {

      ElMessage.error(t("common.message.pageRenderError"));
      console.error(err);

    });

  }).catch(err => {

    ElMessage({

      message: err.response.data.data,
      showClose: true,
      type: "error",
      center: true

    });
    isLoggingIn.value = false;
    isOperateForm.value = true;

  });


}

</script>


<style lang="scss" scoped>


@import "login.module";


</style>
