<template>

  <div class="loginContainer">

    <transition name="el-zoom-in-center">
      <div v-show="isShowLoginBox" class="formContainer">

        <transition name="el-fade-in-linear">
          <h3 v-show="isShowLoginForm" class="loginTitle">LOGIN</h3>
        </transition>
        <transition name="el-zoom-in-bottom">
          <el-input v-show="isShowLoginForm" class="inputContainer" :disabled="!isOperateForm"
                    :placeholder="$t('login.accountPlaceholder')"
                    input-style="{background-color:transparent;color:antiquewhite;}"
                    v-model="loginData.account" clearable/>
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
import Administrator from "@/model/Administrator";
import {NavigationType} from "@/enums/NavigationType";
import {loginByAccountAndPassword} from "@/api/system/login";
import {useI18n} from "vue-i18n";

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

  account: "",
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

  if (loginData.value.account.toString().trim() === "" || loginData.value.password.toString().trim() === "") {

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


  loginByAccountAndPassword(loginData.value.account, loginData.value.password).then(response => {

    // response = response.data;
    // @ts-ignore
    if (response === undefined || response.code != 200) {

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
        userDataStore.updateUserData(response.data as Administrator);
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

  });


}

</script>


<style lang="scss" scoped>

.loginContainer {

  width: 100vw;
  height: 100vh;
  background-image: url("/src/assets/image/login_background.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-clip: border-box;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  > .formContainer {

    width: 600px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    backdrop-filter: blur(6px);
    box-shadow: 0 0 30px 10px rgb(0, 0, 0, 0.3);

    > .loginTitle {

      font-size: 1.5rem;
      font-weight: bolder;
      letter-spacing: 5px;
      margin-bottom: 40px;

    }

    > .inputContainer {

      width: 300px;
      height: 40px;
      margin-bottom: 40px;
      box-sizing: border-box;
      border-radius: 8px;

      &:focus-within {

        box-shadow: 0 0 15px 8px #ffffad;

      }

      :deep(.el-input__wrapper) {

        background: rgb(0, 0, 0, 0.2);
        border: 0 !important;

        :deep(.el-input__inner) {

          border: 0 !important;

        }

      }

    }

    > .loginButton {

      width: 150px;
      height: 35px;
      color: #03e9f4;
      background: transparent;
      letter-spacing: 4px;

      &:hover {

        background-color: #03e9f4;
        color: #050801;
        box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 200px #03e9f4;

      }

    }

  }

}

</style>
